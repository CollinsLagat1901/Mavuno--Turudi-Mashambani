'use client';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

export default function ProfileHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal details and farm information.
        </p>
      </div>
      <Button disabled>
        <Pencil className="mr-2" />
        Edit Profile
      </Button>
    </div>
  );
}
