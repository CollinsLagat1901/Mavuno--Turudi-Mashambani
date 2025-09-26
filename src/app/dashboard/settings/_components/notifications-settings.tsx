'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function NotificationsSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose how you want to be notified about important events.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="in-app" defaultChecked />
          <Label htmlFor="in-app">In-App Notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms" />
          <Label htmlFor="sms">SMS Alerts</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="email" />
          <Label htmlFor="email">Email Summaries</Label>
        </div>
      </CardContent>
    </Card>
  );
}
