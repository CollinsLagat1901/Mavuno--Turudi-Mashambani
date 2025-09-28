
'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import DashboardLayout from './_components/dashboard-layout';
import SummaryCards from './_components/summary-cards';
import CropRecommendations from './_components/crop-recommendations';
import MarketPrices from './_components/market-prices';
import SoilWeather from './_components/soil-weather';
import { dynamicCropRecommendations, DynamicCropRecommendationsOutput } from '@/ai/flows/dynamic-crop-recommendations';
import { Skeleton } from '@/components/ui/skeleton';


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


export default function DashboardPage() {
    const [recommendations, setRecommendations] = useState<DynamicCropRecommendationsOutput | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              setUserData(userDoc.data());
            }
          } else {
            setUser(null);
            setUserData(null);
          }
          setLoading(false);
        });
    
        return () => unsubscribe();
      }, []);

    useEffect(() => {
        getRecommendations().then(setRecommendations);
    }, []);

    return (
        <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
            <div>
                <p className="text-muted-foreground">
                    {loading ? <Skeleton className="h-5 w-48 mt-1" /> : `Welcome back, ${userData?.name || 'Farmer'}!`}
                </p>
            </div>
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
