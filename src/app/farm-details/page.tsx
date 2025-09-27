import DashboardLayout from '../dashboard/_components/dashboard-layout';
import { FarmDetailsForm } from './_components/farm-details-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function FarmDetailsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-3xl">
                <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">Farm Data Submission</CardTitle>
                <CardDescription>Provide your latest farm details. Mavuno will analyze this data to give you fresh insights.</CardDescription>
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
