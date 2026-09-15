import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';
import * as fs from 'fs';
import * as path from 'path';

const nvidia = createOpenAICompatible({
  name: 'nvidia',
  baseURL: 'https://integrate.api.nvidia.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
  },
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

    const coreMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content || (msg.parts ? msg.parts.map((p: any) => p.text).join('') : '')
    }));
    console.log('Sending messages:', JSON.stringify(coreMessages, null, 2));

    const result = streamText({
      model: nvidia('meta/llama-3.2-11b-vision-instruct'),
      messages: coreMessages,
      system: systemPrompt,
    });

    console.log('Streaming response...');
    return (result as any).toDataStreamResponse ? (result as any).toDataStreamResponse() : (result as any).toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
