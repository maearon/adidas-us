"use client";

import { ChatbotIcon } from "@/components/icons/HeaderIcons";

export function ChatbotFab() {
  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:bg-neutral-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label="Mở chat hỗ trợ"
    >
      <ChatbotIcon className="h-8 w-8" />
    </button>
  );
}
