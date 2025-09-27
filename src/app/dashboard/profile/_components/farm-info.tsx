
'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tractor, Ruler, MapPin, TestTube, Droplets, ShoppingBasket, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface FarmData {
    name?: string;
    size?: number;
    location?: {
        county?: string;
        subCounty?: string;
        gps?: [number, number];
    };
    soilType?: string;
    irrigation?: string;
    waterSource?: string;
    marketAccess?: string;
}

interface FarmInfoProps {
    farmData: FarmData | null | undefined;
    loading: boolean;
}

export default function FarmInfo({ farmData, loading }: FarmInfoProps) {

  const displayData = {
    name: farmData?.name || 'N/A',
    size: farmData?.size ? `${farmData.size} Acres` : 'N/A',
    location: farmData?.location?.county ? `${farmData.location.county}, ${farmData.location.subCounty}` : 'N/A',
    gps: farmData?.location?.gps ? `(${farmData.location.gps[0].toFixed(3)}, ${farmData.location.gps[1].toFixed(3)})` : '(N/A)',
    soil: farmData?.soilType || 'N/A',
    irrigation: farmData?.irrigation || 'N/A',
    marketAccess: farmData?.marketAccess || 'Moderate',
  };

    const farmInfoItems = [
        { icon: <Tractor />, label: "Farm Name", value: displayData.name },
        { icon: <Ruler />, label: "Farm Size", value: displayData.size },
        { icon: <MapPin />, label: "Location", value: displayData.location },
        { icon: <Droplets />, label: "Irrigation Access", value: displayData.irrigation },
        { icon: <TestTube />, label: "Soil Type", value: displayData.soil },
        { icon: <ShoppingBasket />, label: "Market Access", value: displayData.marketAccess },
    ];

    return (
        <Card>
        <CardHeader>
            <CardTitle>Farm Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {farmInfoItems.map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                        <div className="text-primary flex-shrink-0 w-5 mt-1">{item.icon}</div>
                        <div>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                             {loading ? <Skeleton className="h-5 w-40 mt-1" /> : <p className="font-medium">{item.value}</p>}
                        </div>
                    </div>
                ))}
                 <div className="flex items-start gap-3">
                    <div className="text-primary flex-shrink-0 w-5 mt-1"><MapPin /></div>
                    <div>
                        <p className="text-sm text-muted-foreground">GPS Coordinates</p>
                        {loading ? <Skeleton className="h-5 w-24 mt-1" /> : <p className="font-mono text-sm font-medium">{displayData.gps}</p>}
                    </div>
                </div>
            </div>
            <div className="h-48 w-full rounded-lg overflow-hidden relative">
                <Image
                    src="https://picsum.photos/seed/map-view/600/400"
                    alt="Map preview of farm location"
                    fill
                    className="object-cover opacity-50"
                    data-ai-hint="map view"
                />
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                    <p className="font-bold text-muted-foreground">[Map Preview]</p>
                </div>
            </div>
             <div className="flex gap-2">
                <Button variant="outline" disabled>View on Map</Button>
                <Button variant="secondary" disabled>
                    <PlusCircle className="mr-2" />
                    Add Another Farm
                </Button>
            </div>
        </CardContent>
        </Card>
    );
}
