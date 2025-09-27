'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { User } from 'firebase/auth';

import DashboardLayout from '../_components/dashboard-layout';
import CropAnalysis from './_components/crop-analysis';
import WeatherSoilInsight from './_components/weather-soil-insight';
import MarketInsight from './_components/market-insight';
import RegionalInsight from './_components/regional-insight';
import ActionableRecommendations from './_components/actionable-recommendations';
import AIGeneratedInsight from './_components/ai-generated-insight';

export default function InsightsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [latestSubmission, setLatestSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch the latest submission for this user
        const submissionsQuery = query(
          collection(db, 'farmerSubmissions'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const querySnapshot = await getDocs(submissionsQuery);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setLatestSubmission({ id: doc.id, ...doc.data() });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">AI Insights Engine 🔬</h1>
          <p className="text-muted-foreground">
            Generate and view personalized AI-driven insights for your farm.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
             <AIGeneratedInsight submission={latestSubmission} loading={loading} userId={user?.uid} />
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
