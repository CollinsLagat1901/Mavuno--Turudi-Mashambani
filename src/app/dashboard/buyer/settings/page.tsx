'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import BuyerDashboardLayout from '../_components/buyer-dashboard-layout';
import { Separator } from '@/components/ui/separator';

import SettingsHeader from '@/app/dashboard/settings/_components/settings-header';
import NotificationsSettings from '@/app/dashboard/settings/_components/notifications-settings';
import AppearanceSettings from '@/app/dashboard/settings/_components/appearance-settings';
import AccountManagement from '@/app/dashboard/settings/_components/account-management';
import AiPersonalizationSettings from '@/app/dashboard/settings/_components/ai-personalization-settings';

interface UserData {
    name?: string;
}

export default function BuyerSettingsPage() {
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
        <SettingsHeader />
        <Separator />
        <div className="mx-auto grid w-full max-w-3xl gap-6">
          <AiPersonalizationSettings />
          <NotificationsSettings />
          <AppearanceSettings />
          <AccountManagement />
        </div>
      </div>
    </BuyerDashboardLayout>
  );
}
