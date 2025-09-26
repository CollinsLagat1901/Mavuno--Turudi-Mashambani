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
                <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-muted-foreground">Step 2 of 3</p>
                    <Progress value={66} className="w-full" />
                </div>
                <CardTitle className="text-3xl font-bold text-primary">Farmer Profile Setup</CardTitle>
                <CardDescription>Tell us more about your farm so Mavuno can give you the best recommendations.</CardDescription>
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
