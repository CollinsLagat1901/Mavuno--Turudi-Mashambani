
import BuyerDashboardLayout from '../_components/buyer-dashboard-layout';
import ChatBox from './_components/chat-box';


export default function BuyerAssistantPage() {
  return (
    <BuyerDashboardLayout user={null} userData={null} loading={true}>
      <div className="flex flex-col h-[calc(100vh-65px)]">
         <div className="p-4 border-b">
            <header className="text-center">
                <h1 className="text-2xl font-bold text-primary">Mavuno Assistant for Buyers 🛒</h1>
                <p className="text-muted-foreground">Your personal AI sourcing advisor. Ask anything about the market.</p>
            </header>
        </div>
        <ChatBox />
      </div>
    </BuyerDashboardLayout>
  );
}
