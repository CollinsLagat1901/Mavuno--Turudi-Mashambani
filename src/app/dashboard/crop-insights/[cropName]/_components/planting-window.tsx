'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, CloudRain } from 'lucide-react';

const plantingData = {
  start: '3 days from now',
  harvestTime: '4 months',
  forecast: 'Rainfall expected in 2-5 days — ideal window for planting.'
};

export default function PlantingWindow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><CalendarDays /> Planting & Weather Window</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
          <CalendarDays className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Recommended Start</p>
            <p className="font-bold">{plantingData.start}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Harvest Time</p>
            <p className="font-bold">{plantingData.harvestTime}</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-3 rounded-lg bg-accent">
            <CloudRain className="h-6 w-6 text-secondary flex-shrink-0" />
            <div>
                <p className="text-sm text-accent-foreground font-semibold">Weather note:</p>
                <p className="text-sm text-accent-foreground">{plantingData.forecast}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
