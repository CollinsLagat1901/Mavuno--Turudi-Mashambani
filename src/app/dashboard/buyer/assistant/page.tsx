
'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import BuyerDashboardLayout from '../_components/buyer-dashboard-layout';
import ChatBox from './_components/chat-box';


export default function BuyerAssistantPage() {
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
      <div className="flex flex-col h-[calc(100vh-65px)]">
         <div className="p-4 border-b">
            <header className="text-center">
                <h1 className="text-2xl font-bold text-primary">Mavuno Assistant for Buyers 🛒</h1>
                <p className="text-muted-foreground">Your personal AI sourcing advisor. Ask anything about the market.</p>
            </header>
        </div>
        <ChatBox />
      </div>
    </BuyerDashboardLayout>
  );
}
