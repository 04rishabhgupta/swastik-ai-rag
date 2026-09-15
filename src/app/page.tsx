"use client";

import { useChat } from "@ai-sdk/react";
import { Thread } from "@/components/assistant-ui/elements/thread.aui";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export default function Home() {
  const chat = useChat();
  
  const runtime = useChatRuntime(chat);

  return (
    <main className="flex-1 overflow-hidden h-screen bg-background text-foreground flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-5xl py-12 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center mb-6 shrink-0 flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"></path></svg>
          </div>
          <h1 className="text-3xl font-semibold text-primary tracking-tight">Swastik Clinic Assistant</h1>
          <p className="text-muted-foreground text-sm">Comprehensive Medical Care</p>
        </div>
        
        <div className="w-full max-w-3xl flex-1 rounded-[32px] border border-border bg-card shadow-[0_8px_40px_-12px_rgba(7,69,90,0.15)] overflow-hidden flex flex-col relative">
          <AssistantRuntimeProvider runtime={runtime}>
            <Thread />
          </AssistantRuntimeProvider>
        </div>
      </div>
    </main>
  );
}
