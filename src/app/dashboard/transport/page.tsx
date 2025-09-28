
'use client';

import DashboardLayout from '../_components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tractor } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function FarmerTransportPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Transport Services 🚚
          </h1>
          <p className="text-muted-foreground">
            Find reliable transporters to get your produce to the market.
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Farmer Transport Dashboard</CardTitle>
              <CardDescription>
                This section is under construction. Soon you'll be able to post a transport job, get quotes from verified transporters, and track your delivery in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Tractor className="mx-auto h-20 w-20 text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">Coming Soon!</p>
               <p className="text-muted-foreground">We are building a network of trusted transporters for you.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
