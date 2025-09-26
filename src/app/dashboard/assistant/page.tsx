import DashboardLayout from '../_components/dashboard-layout';
import ChatBox from './_components/chat-box';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AssistantPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-65px)]">
         <div className="p-4 border-b">
            <header className="text-center">
                <h1 className="text-2xl font-bold text-primary">Mavuno Assistant 🌱</h1>
                <p className="text-muted-foreground">Your personal AI advisor. Ask anything about your farm.</p>
            </header>
        </div>
        <ChatBox />
      </div>
    </DashboardLayout>
  );
}
