import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import * as fs from 'fs';
import * as path from 'path';

const openai = createOpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const kbPath = path.join(process.cwd(), 'Knowledge.md');
    let contextStr = '';
    if (fs.existsSync(kbPath)) {
      contextStr = fs.readFileSync(kbPath, 'utf8');
    }

    const systemPrompt = `You are a helpful chatbot for Swastik Clinic. Use the following context from our knowledge base to answer the user's questions accurately.
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
