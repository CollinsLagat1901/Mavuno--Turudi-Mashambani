
'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import BuyerDashboardLayout from './_components/buyer-dashboard-layout';
import ProductListings from './_components/product-listings';
import MarketOverview from './_components/market-overview';
import FarmerConnections from './_components/farmer-connections';
import { Separator } from '@/components/ui/separator';

interface UserData {
    name?: string;
}

export default function BuyerDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BuyerDashboardLayout user={user} userData={userData} loading={loading}>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Welcome, {loading ? '...' : userData?.name || 'Buyer'} 🛒
            </h1>
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
    </BuyerDashboardLayout>
  );
}
