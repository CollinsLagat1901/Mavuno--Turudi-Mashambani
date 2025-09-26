import DashboardLayout from '../_components/dashboard-layout';
import CurrentPrices from './_components/current-prices';
import MarketHighlights from './_components/market-highlights';
import BuyerConnections from './_components/buyer-connections';
import { Separator } from '@/components/ui/separator';

export default function MarketPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Market Insights 🛒</h1>
          <p className="text-muted-foreground">
            Compare prices, find the best market, and connect directly with buyers.
          </p>
        </div>
        <Separator />
        <div className="space-y-6">
            <MarketHighlights />
            <CurrentPrices />
            <BuyerConnections />
        </div>
      </div>
    </DashboardLayout>
  );
}
