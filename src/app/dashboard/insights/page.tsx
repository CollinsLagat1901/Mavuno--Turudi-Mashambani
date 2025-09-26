import DashboardLayout from '../_components/dashboard-layout';
import CropAnalysis from './_components/crop-analysis';
import WeatherSoilInsight from './_components/weather-soil-insight';
import MarketInsight from './_components/market-insight';
import RegionalInsight from './_components/regional-insight';
import ActionableRecommendations from './_components/actionable-recommendations';

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Insights 📊</h1>
          <p className="text-muted-foreground">
            See what Entity AI has discovered for your farm in Nakuru County.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CropAnalysis />
            <MarketInsight />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <WeatherSoilInsight />
            <RegionalInsight />
            <ActionableRecommendations />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
