
'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { User } from 'firebase/auth';

import BuyerDashboardLayout from '../_components/buyer-dashboard-layout';
import { Separator } from '@/components/ui/separator';

import ProfileHeader from './_components/profile-header';
import BuyerInfo from './_components/buyer-info';
import CompanyInfo from './_components/company-info';
import SourcingPreferences from './_components/sourcing-preferences';
import AccountSettings from '@/app/dashboard/profile/_components/account-settings'; // Re-usable
import EditProfileDialog from './_components/edit-profile-dialog';
import VerificationStatus from './_components/verification-status';

interface UserData {
    name?: string;
    phone?: string;
    email?: string;
    kraPin?: string;
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

  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged(currentUser => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, 'users', currentUser.uid);
        const dataUnsubscribe = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data() as UserData);
          }
          setLoading(false);
        });
        return () => dataUnsubscribe();
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });
    
    return () => authUnsubscribe();
  }, []);

  const handleProfileUpdate = (data: Partial<UserData>) => {
    setUserData(prevData => ({ ...prevData, ...data }));
  }

  return (
    <BuyerDashboardLayout user={user} userData={userData} loading={loading}>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <ProfileHeader user={user} userData={userData} loading={loading}>
            <EditProfileDialog userData={userData} onProfileUpdate={handleProfileUpdate} />
        </ProfileHeader>
        <Separator />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <BuyerInfo userData={userData} loading={loading} />
                <CompanyInfo userData={userData} loading={loading} />
            </div>
            <div className="lg:col-span-1 space-y-6">
                <VerificationStatus />
                <SourcingPreferences userData={userData} loading={loading} />
                <AccountSettings />
            </div>
        </div>
      </div>
    </BuyerDashboardLayout>
  );
}
