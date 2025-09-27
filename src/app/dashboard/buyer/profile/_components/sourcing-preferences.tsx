
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Map, Bell, Star } from 'lucide-react';

const preferencesData = {
    preferredCrops: ["Avocado", "Mangoes", "French Beans"],
    targetRegions: ["Murang'a", "Meru", "Kiambu"],
    notifications: "Price Drops & New Listings",
    qualityTier: "Grade A / Export Quality"
}

export default function SourcingPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sourcing Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
            <Package className="text-primary w-5 mt-1"/>
            <div>
                <p className="text-sm text-muted-foreground">Preferred Crops</p>
                <p className="font-medium">{preferencesData.preferredCrops.join(', ')}</p>
            </div>
        </div>
        <div className="flex items-start gap-3">
            <Map className="text-primary w-5 mt-1"/>
            <div>
                <p className="text-sm text-muted-foreground">Target Regions</p>
                <p className="font-medium">{preferencesData.targetRegions.join(', ')}</p>
            </div>
        </div>
        <div className="flex items-start gap-3">
            <Star className="text-primary w-5 mt-1"/>
            <div>
                <p className="text-sm text-muted-foreground">Preferred Quality</p>
                <p className="font-medium">{preferencesData.qualityTier}</p>
            </div>
        </div>
        <div className="flex items-start gap-3">
            <Bell className="text-primary w-5 mt-1"/>
            <div>
                <p className="text-sm text-muted-foreground">Custom Alerts</p>
                <p className="font-medium">{preferencesData.notifications}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
