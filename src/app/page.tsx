"use client";

import { useChat } from "@ai-sdk/react";
import { Thread } from "@/components/assistant-ui/elements/thread.aui";
import { SiteHeader } from "@/components/brand/site-header";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export default function Home() {
  const chat = useChat();
  
  const runtime = useChatRuntime(chat);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <SiteHeader />
      <main className="relative flex min-h-0 flex-1 flex-col">
        <AssistantRuntimeProvider runtime={runtime}>
          <Thread />
        </AssistantRuntimeProvider>
      </main>
    </div>
  );
}
