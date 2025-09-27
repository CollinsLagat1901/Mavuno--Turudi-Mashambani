
'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { User } from 'firebase/auth';

import DashboardLayout from '../_components/dashboard-layout';
import { Separator } from '@/components/ui/separator';

import ProfileHeader from './_components/profile-header';
import PersonalInfo from './_components/personal-info';
import FarmInfo from './_components/farm-info';
import CropInfo from './_components/crop-info';
import GoalsPreferences from './_components/goals-preferences';
import AccountSettings from './_components/account-settings';
import ProfileCompletion from './_components/profile-completion-widget';
import EditProfileDialog from './_components/edit-profile-dialog';

interface UserData {
    name?: string;
    phone?: string;
    email?: string;
    experience?: string;
    goal?: string;
    language?: string;
    farms?: {
        [key: string]: {
            name?: string;
            size?: number;
            location?: {
                county?: string;
                subCounty?: string;
                gps?: [number, number];
            };
            soilType?: string;
            irrigation?: string;
            waterSource?: string;
            crops?: {
                [key: string]: {
                    name?: string;
                    stage?: string;
                    season?: string;
                    method?: string;
                    expectedYield?: number | string;
                }
            }
        }
    }
}

export default function ProfilePage() {
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
            setUserData({email: currentUser.email, ...doc.data()} as UserData);
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

  const farmData = userData?.farms?.farm1;
  const completionPercentage = farmData?.soilType && farmData?.soilType !== 'Unknown' ? 100 : 85;


  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <ProfileHeader user={user} userData={userData} loading={loading}>
          <EditProfileDialog userData={userData} onProfileUpdate={handleProfileUpdate} />
        </ProfileHeader>
        <Separator />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <PersonalInfo userData={userData} loading={loading} />
                <FarmInfo farmData={farmData} loading={loading} />
                <CropInfo farmData={farmData} loading={loading} />
            </div>
            <div className="lg:col-span-1 space-y-6">
                <ProfileCompletion percentage={completionPercentage} loading={loading} />
                <GoalsPreferences userData={userData} loading={loading} />
                <AccountSettings />
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
