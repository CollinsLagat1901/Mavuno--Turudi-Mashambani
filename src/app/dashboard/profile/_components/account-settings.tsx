'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KeyRound, Trash2, Moon, Sun } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function AccountSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full justify-start" disabled>
            <KeyRound className="mr-2" />
            Reset Password
        </Button>
        <Button variant="destructive" className="w-full justify-start" disabled>
            <Trash2 className="mr-2" />
            Delete Account
        </Button>
        <Separator />
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="flex items-center gap-2">
            <Moon />
            <span>Dark Mode</span>
          </Label>
          <Switch id="dark-mode" disabled />
        </div>
      </CardContent>
    </Card>
  );
}
