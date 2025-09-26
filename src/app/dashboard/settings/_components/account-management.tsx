'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KeyRound, Trash2 } from 'lucide-react';

export default function AccountManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Management</CardTitle>
        <CardDescription>
          Manage your account security and data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full justify-start" disabled>
          <KeyRound className="mr-2 h-4 w-4" />
          Reset Password
        </Button>
        <Button variant="destructive" className="w-full justify-start" disabled>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
}
