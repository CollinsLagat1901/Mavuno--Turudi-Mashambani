
import DashboardLayout from '../_components/dashboard-layout';
import ProductListings from './_components/product-listings';
import MarketOverview from './_components/market-overview';
import FarmerConnections from './_components/farmer-connections';
import { Separator } from '@/components/ui/separator';

export default function BuyerDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Buyer Dashboard 🛒</h1>
          <p className="text-muted-foreground">
            Discover produce, connect with farmers, and manage your purchases.
          </p>
        </div>
        <Separator />
        <div className="space-y-6">
            <MarketOverview />
            <ProductListings />
            <FarmerConnections />
        </div>
      </div>
    </DashboardLayout>
  );
}

    