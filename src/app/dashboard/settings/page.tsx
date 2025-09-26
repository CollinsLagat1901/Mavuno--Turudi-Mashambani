import DashboardLayout from '../_components/dashboard-layout';
import { Separator } from '@/components/ui/separator';

import SettingsHeader from './_components/settings-header';
import NotificationsSettings from './_components/notifications-settings';
import AppearanceSettings from './_components/appearance-settings';
import AccountManagement from './_components/account-management';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <SettingsHeader />
        <Separator />
        <div className="mx-auto grid w-full max-w-3xl gap-6">
          <NotificationsSettings />
          <AppearanceSettings />
          <AccountManagement />
        </div>
      </div>
    </DashboardLayout>
  );
}
