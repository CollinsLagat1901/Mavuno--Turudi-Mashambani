'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tractor, Ruler, MapPin, TestTube, Droplets, ShoppingBasket, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const farmData = {
  name: 'Green Acres',
  size: '5 Acres',
  location: 'Nakuru County, Bahati Sub-County',
  gps: '(-0.312, 36.123)',
  type: 'Crop Farming',
  soil: 'Loamy',
  irrigation: 'Yes (River)',
  marketAccess: 'Moderate',
};

const farmInfoItems = [
    { icon: <Tractor />, label: "Farm Name", value: farmData.name },
    { icon: <Ruler />, label: "Farm Size", value: farmData.size },
    { icon: <MapPin />, label: "Location", value: farmData.location },
    { icon: <Droplets />, label: "Irrigation Access", value: farmData.irrigation },
    { icon: <TestTube />, label: "Soil Type", value: farmData.soil },
    { icon: <ShoppingBasket />, label: "Market Access", value: farmData.marketAccess },
]

export default function FarmInfo() {
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
                        <p className="font-medium">{item.value}</p>
                    </div>
                </div>
            ))}
             <div className="flex items-start gap-3">
                <div className="text-primary flex-shrink-0 w-5 mt-1"><MapPin /></div>
                <div>
                    <p className="text-sm text-muted-foreground">GPS Coordinates</p>
                    <p className="font-mono text-sm font-medium">{farmData.gps}</p>
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
            <Button variant="outline" disabled>Edit Farm Details</Button>
            <Button variant="secondary" disabled>
                <PlusCircle className="mr-2" />
                Add Another Farm
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
