'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import BuyerDashboardLayout from '../_components/buyer-dashboard-layout';
import { Separator } from '@/components/ui/separator';

import ProfileHeader from '@/app/dashboard/profile/_components/profile-header'; // Re-usable

// Buyer-specific components
import BuyerInfo from './_components/buyer-info';
import CompanyInfo from './_components/company-info';
import SourcingPreferences from './_components/sourcing-preferences';
import AccountSettings from '@/app/dashboard/profile/_components/account-settings'; // Re-usable
import EditProfileDialog from './_components/edit-profile-dialog';

interface UserData {
    name?: string;
    phone?: string;
    email?: string;
    companyInfo?: {
      name?: string;
      location?: string;
      website?: string;
      type?: string;
    };
    sourcingPreferences?: {
        preferredCrops?: string[];
        targetRegions?: string[];
        qualityTier?: string;
        notifications?: string;
    }
}

export default function BuyerProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (currentUser: User) => {
    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
    if (userDoc.exists()) {
      setUserData(userDoc.data() as UserData);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProfileUpdate = (data: Partial<UserData>) => {
    // This function optimistically updates the UI.
    // A more robust solution might refetch the data.
     if (user) {
      fetchUserData(user);
    }
  }

  return (
    <BuyerDashboardLayout user={user} userData={userData} loading={loading}>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <ProfileHeader>
            <EditProfileDialog userData={userData} onProfileUpdate={handleProfileUpdate} />
        </ProfileHeader>
        <Separator />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <BuyerInfo userData={userData} loading={loading} />
                <CompanyInfo userData={userData} loading={loading} />
            </div>
            <div className="lg:col-span-1 space-y-6">
                <SourcingPreferences userData={userData} loading={loading} />
                <AccountSettings />
            </div>
        </div>
      </div>
    </BuyerDashboardLayout>
  );
}
