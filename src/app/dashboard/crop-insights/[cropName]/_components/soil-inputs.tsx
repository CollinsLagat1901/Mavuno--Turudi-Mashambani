'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube2, Droplets, Info } from 'lucide-react';

const soilData = {
  idealPh: '6.0 - 7.0',
  yourPh: '6.8 (✅)',
  fertilizer: 'DAP at planting, CAN top dressing',
  water: 'Moderate',
  tip: 'Your soil pH is perfect. Consider applying compost for improved yield.'
};

export default function SoilInputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><TestTube2 /> Soil & Input Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 rounded-lg border">
            <p className="text-sm text-muted-foreground">Ideal pH: <span className="font-semibold text-foreground">{soilData.idealPh}</span></p>
            <p className="text-sm text-muted-foreground">Your Farm's pH: <span className="font-semibold text-primary">{soilData.yourPh}</span></p>
        </div>
        <div className="p-3 rounded-lg border">
            <p className="text-sm text-muted-foreground">Fertilizer:</p>
            <p className="font-semibold">{soilData.fertilizer}</p>
        </div>
        <div className="p-3 rounded-lg border">
            <p className="text-sm text-muted-foreground">Water Needs:</p>
            <p className="font-semibold">{soilData.water}</p>
        </div>
        <div className="p-3 bg-accent rounded-lg flex items-start gap-3">
            <div className="flex-shrink-0"><Info className="text-primary" /></div>
            <p className="text-sm text-accent-foreground">
                <span className="font-semibold">Tip:</span> {soilData.tip}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
