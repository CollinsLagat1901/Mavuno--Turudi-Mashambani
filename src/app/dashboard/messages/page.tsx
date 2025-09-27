
import DashboardLayout from "../_components/dashboard-layout";
import ConversationList from "./_components/conversation-list";
import ChatWindow from "./_components/chat-window";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

function ChatSuspenseWrapper() {
  return (
    <Suspense fallback={<div className="h-full flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <ChatWindow />
    </Suspense>
  )
}

export default function MessagesPage() {
    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] h-[calc(100vh-65px)]">
                <div className="hidden md:block border-r">
                   <ConversationList />
                </div>
                <div className="h-full">
                  <ChatSuspenseWrapper />
                </div>
            </div>
        </DashboardLayout>
    )
}
