'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Bot, Bell, MessageSquare } from 'lucide-react';

const goalsData = {
    mainGoal: "Profit Maximization",
    aiFocus: ["Crop Selection", "Market Insights"],
    notifications: "In-App Only",
    adviceType: "Weekly Summary"
}

export default function GoalsPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals & Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
            <Target className="text-primary w-5 mt-1"/>
            <div>
                <p className="text-sm text-muted-foreground">Main Farming Goal</p>
                <p className="font-medium">{goalsData.mainGoal}</p>
            </div>
        </div>
        <div className="flex items-start gap-3">
            <Bot className="text-primary w-5 mt-1"/>
            <div>
                <p className="text-sm text-muted-foreground">AI Focus Areas</p>
                <p className="font-medium">{goalsData.aiFocus.join(', ')}</p>
            </div>
        </div>
        <div className="flex items-start gap-3">
            <Bell className="text-primary w-5 mt-1"/>
            <div>
                <p className="text-sm text-muted-foreground">Notifications</p>
                <p className="font-medium">{goalsData.notifications}</p>
            </div>
        </div>
         <div className="flex items-start gap-3">
            <MessageSquare className="text-primary w-5 mt-1"/>
            <div>
                <p className="text-sm text-muted-foreground">Preferred Advice Type</p>
                <p className="font-medium">{goalsData.adviceType}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
