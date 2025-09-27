'use client';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { ReactNode } from 'react';

export default function ProfileHeader({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal details and farm information.
        </p>
      </div>
      {children}
    </div>
  );
}
