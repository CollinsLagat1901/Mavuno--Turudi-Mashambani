import DashboardLayout from './_components/dashboard-layout';
import SummaryCards from './_components/summary-cards';
import CropRecommendations from './_components/crop-recommendations';
import MarketPrices from './_components/market-prices';
import SoilWeather from './_components/soil-weather';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome, Jembe
          </h2>
        </div>
        <SummaryCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <CropRecommendations />
            <div className="col-span-1 lg:col-span-3 space-y-4">
              <MarketPrices />
              <SoilWeather />
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
