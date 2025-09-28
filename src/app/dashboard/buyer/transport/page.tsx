
'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import BuyerDashboardLayout from '../_components/buyer-dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tractor } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface UserData {
    name?: string;
}

export default function BuyerTransportPage() {
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
      } else {
        setUser(null);
        setUserData(null);
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
            Logistics & Transport 🚚
          </h1>
          <p className="text-muted-foreground">
            Arrange transport for the produce you have purchased.
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Buyer Transport Dashboard</CardTitle>
              <CardDescription>
                This section is under construction. Soon you'll be able to book transport, view logistics requests from farmers, and manage deliveries.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Tractor className="mx-auto h-20 w-20 text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">Coming Soon!</p>
              <p className="text-muted-foreground">A streamlined way to manage your produce logistics is on its way.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </BuyerDashboardLayout>
  );
}
