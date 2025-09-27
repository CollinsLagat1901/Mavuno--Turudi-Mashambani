
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Bot, Bell, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface GoalsPreferencesProps {
  userData: {
    goal?: string;
    preferences?: {
      ai_focus?: string[];
      notifications?: string[];
    };
  } | null;
  loading: boolean;
}

export default function GoalsPreferences({ userData, loading }: GoalsPreferencesProps) {
  const goalsData = {
    mainGoal: userData?.goal || "Not set",
    aiFocus: userData?.preferences?.ai_focus?.join(', ') || "Not set",
    notifications: userData?.preferences?.notifications?.join(', ') || "Not set",
    adviceType: "Weekly Summary" // This can be a new field in preferences
  };

  const preferenceItems = [
      { icon: <Target />, label: "Main Farming Goal", value: goalsData.mainGoal },
      { icon: <Bot />, label: "AI Focus Areas", value: goalsData.aiFocus },
      { icon: <Bell />, label: "Notifications", value: goalsData.notifications },
      { icon: <MessageSquare />, label: "Preferred Advice Type", value: goalsData.adviceType },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals & Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {preferenceItems.map(item => (
            <div key={item.label} className="flex items-start gap-3">
                <div className="text-primary w-5 mt-1 flex-shrink-0">{item.icon}</div>
                <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {loading ? <Skeleton className="h-5 w-32 mt-1" /> : <p className="font-medium">{item.value}</p>}
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
