
'use client';
import { Button } from '@/components/ui/button';

export default function SettingsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Buyer Control Center ⚙️</h1>
        <p className="text-muted-foreground">
          Manage your account, notifications, and application preferences.
        </p>
      </div>
      <Button disabled>Save Changes</Button>
    </div>
  );
}
