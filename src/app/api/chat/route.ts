import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { pipeline } from '@huggingface/transformers';
import * as fs from 'fs';
import * as path from 'path';

const openai = createOpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

let chunks: string[] = [];
let chunkEmbeddings: number[][] = [];
let embedder: any = null;

function cosineSimilarity(vecA: number[], vecB: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function initVectorStore() {
  if (chunks.length > 0) return;

  const kbPath = path.join(process.cwd(), 'Knowledge.md');
  let text = '';
  if (fs.existsSync(kbPath)) {
    text = fs.readFileSync(kbPath, 'utf8');
  } else {
    console.warn('Knowledge.md not found at', kbPath);
  }

  chunks = text.split('\n## ').filter(Boolean).map(c => '## ' + c);
  embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  for (const chunk of chunks) {
    const result = await embedder(chunk, { pooling: 'mean', normalize: true });
    chunkEmbeddings.push(Array.from(result.data));
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1];
    let contextStr = '';

    if (latestMessage && latestMessage.role === 'user') {
      await initVectorStore();
      
      const queryResult = await embedder(latestMessage.content, { pooling: 'mean', normalize: true });
      const queryEmbedding = Array.from(queryResult.data) as number[];
      
      const similarities = chunks.map((chunk, i) => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunkEmbeddings[i])
      }));
      
      similarities.sort((a, b) => b.score - a.score);
      contextStr = similarities.slice(0, 3).map(s => s.chunk).join('\n\n');
      console.log('Retrieved context:', contextStr);
    }

    const systemPrompt = `You are a helpful chatbot for Swastik Clinic. Use the following retrieved context from our knowledge base to answer the user's questions accurately.
If the context does not contain the answer, politely say you don't know and don't make up information.
Keep your responses concise and professional.

Context:
${contextStr}`;

    const result = streamText({
      model: openai('nvidia/nemotron-4-340b-instruct'),
      messages,
      system: systemPrompt,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
