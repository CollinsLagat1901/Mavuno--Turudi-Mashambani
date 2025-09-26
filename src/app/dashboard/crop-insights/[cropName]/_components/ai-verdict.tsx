'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const verdict = "Maize is highly profitable for your farm. Ideal soil, timely rains, and strong demand make it your top choice. Proceed with planting within 5 days for maximum yield.";

export default function AiVerdict() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary"><Lightbulb /> Entity AI Verdict</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-lg font-medium text-foreground/90">
          “{verdict}”
        </p>
        <Button disabled>Mark as Selected Crop (Coming Soon)</Button>
      </CardContent>
    </Card>
  );
}
