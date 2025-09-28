
'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import BuyerDashboardLayout from '../_components/buyer-dashboard-layout';
import Feed from '@/app/insights/_components/feed';


export default function BuyerSocialsPage() {
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

  return (
    <BuyerDashboardLayout user={user} userData={userData} loading={loading}>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
            <Feed />
        </div>
    </BuyerDashboardLayout>
  );
}
