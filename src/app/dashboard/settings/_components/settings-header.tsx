
'use client';
import { Button } from '@/components/ui/button';

export default function SettingsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Admin Control Center ⚙️</h1>
        <p className="text-muted-foreground">
          Manage users, view system data, and configure application settings.
        </p>
      </div>
      <Button disabled>Save Changes</Button>
    </div>
  );
}

    