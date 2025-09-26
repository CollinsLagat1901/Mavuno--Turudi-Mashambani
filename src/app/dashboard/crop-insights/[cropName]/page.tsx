import DashboardLayout from '../../_components/dashboard-layout';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

import CropOverview from './_components/crop-overview';
import FinancialForecast from './_components/financial-forecast';
import PlantingWindow from './_components/planting-window';
import SoilInputs from './_components/soil-inputs';
import RisksRecommendations from './_components/risks-recommendations';
import MarketAnalysis from './_components/market-analysis';
import AiVerdict from './_components/ai-verdict';
import { Separator } from '@/components/ui/separator';

// This would be fetched dynamically based on params.cropName
const cropData = {
  name: 'Maize',
  farmSize: 5,
  county: 'Nakuru',
};

export default function CropInsightPage({ params }: { params: { cropName: string } }) {
    const cropName = params.cropName.charAt(0).toUpperCase() + params.cropName.slice(1);

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="space-y-2">
            <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/insights">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Insights
                </Link>
            </Button>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Crop Insight: {cropName} 🌽</h1>
          <p className="text-muted-foreground">
            Smart analysis for your {cropData.farmSize}-acre farm in {cropData.county} County.
          </p>
        </div>
        
        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <CropOverview />
                <FinancialForecast />
                <MarketAnalysis />
            </div>
             <div className="lg:col-span-1 space-y-6">
                <PlantingWindow />
                <SoilInputs />
                <RisksRecommendations />
            </div>
        </div>
        <AiVerdict />
      </div>
    </DashboardLayout>
  );
}
