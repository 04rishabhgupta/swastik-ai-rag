"use client";

import { useChat } from "@ai-sdk/react";
import { Thread } from "@/components/assistant-ui/elements/thread.aui";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export default function Home() {
  const chat = useChat();
  
  const runtime = useChatRuntime(chat);

  return (
    <main className="flex-1 overflow-hidden h-screen bg-black text-neutral-100 flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-5xl py-12 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center mb-6 shrink-0">
          <h1 className="text-3xl font-medium text-white tracking-tight">Swastik Clinic Assistant</h1>
        </div>
        
        <div className="w-full max-w-3xl flex-1 rounded-[24px] border border-neutral-800 bg-[#0A0A0A] shadow-2xl overflow-hidden flex flex-col relative">
          <AssistantRuntimeProvider runtime={runtime}>
            <Thread />
          </AssistantRuntimeProvider>
        </div>
      </div>
    </main>
  );
}
