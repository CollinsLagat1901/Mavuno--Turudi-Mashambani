
'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import BuyerDashboardLayout from '../buyer/_components/buyer-dashboard-layout'; // Using buyer layout as a template
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tractor, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface UserData {
    name?: string;
}

export default function TransporterDashboardPage() {
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
            Welcome, {loading ? <Loader2 className="inline-block animate-spin" /> : userData?.name || 'Transporter'}! 🚚
          </h1>
          <p className="text-muted-foreground">
            Manage your jobs, view requests, and update your profile.
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Transporter Dashboard</CardTitle>
              <CardDescription>
                This section is under construction. Soon you'll be able to see available delivery requests, manage your accepted jobs, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Tractor className="mx-auto h-16 w-16 text-muted-foreground" />
              <p className="mt-4 font-semibold">Coming Soon!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </BuyerDashboardLayout>
  );
}

    