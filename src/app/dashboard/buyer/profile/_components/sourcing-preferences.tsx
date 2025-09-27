
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Map, Bell, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


interface SourcingPreferencesProps {
    userData: {
        sourcingPreferences?: {
            preferredCrops?: string[];
            targetRegions?: string[];
            qualityTier?: string;
            notifications?: string;
        }
    } | null;
    loading: boolean;
}

export default function SourcingPreferences({ userData, loading }: SourcingPreferencesProps) {
    const preferencesData = {
        preferredCrops: userData?.sourcingPreferences?.preferredCrops?.join(', ') || "Not set",
        targetRegions: userData?.sourcingPreferences?.targetRegions?.join(', ') || "Not set",
        notifications: userData?.sourcingPreferences?.notifications || "Not set",
        qualityTier: userData?.sourcingPreferences?.qualityTier || "Not set"
    }

    const preferenceItems = [
        { icon: <Package />, label: 'Preferred Crops', value: preferencesData.preferredCrops },
        { icon: <Map />, label: 'Target Regions', value: preferencesData.targetRegions },
        { icon: <Star />, label: 'Preferred Quality', value: preferencesData.qualityTier },
        { icon: <Bell />, label: 'Custom Alerts', value: preferencesData.notifications },
    ];

    return (
        <Card>
        <CardHeader>
            <CardTitle>Sourcing Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {preferenceItems.map(item => (
                 <div key={item.label} className="flex items-start gap-3">
                    <div className="text-primary w-5 mt-1 flex-shrink-0">{item.icon}</div>
                    <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {loading ? <Skeleton className="h-5 w-32 mt-1" /> : <p className="font-medium">{item.value}</p>}
                    </div>
                </div>
            ))}
        </CardContent>
        </Card>
    );
}
