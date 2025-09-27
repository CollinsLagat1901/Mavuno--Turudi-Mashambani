import DashboardLayout from './_components/dashboard-layout';
import SummaryCards from './_components/summary-cards';
import CropRecommendations from './_components/crop-recommendations';
import MarketPrices from './_components/market-prices';
import SoilWeather from './_components/soil-weather';
import { dynamicCropRecommendations, DynamicCropRecommendationsOutput } from '@/ai/flows/dynamic-crop-recommendations';

// Mock user data - in a real app, you'd fetch this for the logged-in user
const mockFarmerData = {
    county: 'Nakuru',
    crops: 'Maize, Beans, Tomatoes, Potatoes',
    farmSize: 5,
};

async function getRecommendations(): Promise<DynamicCropRecommendationsOutput | null> {
    try {
        const recommendations = await dynamicCropRecommendations({
            county: mockFarmerData.county,
            crops: mockFarmerData.crops,
            additionalDetails: `Farm size is ${mockFarmerData.farmSize} acres.`,
        });
        return recommendations;
    } catch (error) {
        console.error('Error fetching AI recommendations:', error);
        // Return a default or empty state in case of an error
        return null;
    }
}


export default async function DashboardPage() {
    const recommendations = await getRecommendations();

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
                <CropRecommendations recommendations={recommendations} />
                <div className="col-span-1 lg:col-span-3 space-y-4">
                <MarketPrices />
                <SoilWeather />
                </div>
            </div>
        </div>
        </DashboardLayout>
    );
}
