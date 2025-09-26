import DashboardLayout from '../_components/dashboard-layout';
import { Separator } from '@/components/ui/separator';

import ProfileHeader from './_components/profile-header';
import PersonalInfo from './_components/personal-info';
import FarmInfo from './_components/farm-info';
import CropInfo from './_components/crop-info';
import GoalsPreferences from './_components/goals-preferences';
import AccountSettings from './_components/account-settings';
import ProfileCompletion from './_components/profile-completion-widget';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <ProfileHeader />
        <Separator />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <PersonalInfo />
                <FarmInfo />
                <CropInfo />
            </div>
            <div className="lg:col-span-1 space-y-6">
                <ProfileCompletion />
                <GoalsPreferences />
                <AccountSettings />
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
