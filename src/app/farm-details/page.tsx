import DashboardLayout from '../dashboard/_components/dashboard-layout';
import { FarmDetailsForm } from './_components/farm-details-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FarmDetailsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">Let’s get to know your farm 🌱</CardTitle>
                <CardDescription>Tell us a bit about your farm so we can give you accurate insights.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FarmDetailsForm />
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
