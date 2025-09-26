'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Cpu, Gauge } from 'lucide-react';

const overviewData = {
  description: "Maize is a staple crop with high demand across Kenya. Ideal for regions with moderate rainfall and loamy soils.",
  stats: [
    { label: "Farm Size Considered", value: "5 acres", icon: <Cpu /> },
    { label: "Weather Fit", value: "Excellent", icon: <CheckCircle /> },
    { label: "Soil Match", value: "Loamy (Ideal)", icon: <CheckCircle /> },
    { label: "Profitability Score", value: "8.9/10", icon: <Gauge /> },
    { label: "Market Trend", value: "+5%", icon: <TrendingUp /> },
  ]
};

export default function CropOverview() {
  const cropImage = PlaceHolderImages.find((img) => img.id === 'maize-insight');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maize Overview</CardTitle>
        <CardDescription>{overviewData.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cropImage && (
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={cropImage.imageUrl}
              alt={cropImage.description}
              fill
              className="object-cover"
              data-ai-hint={cropImage.imageHint}
            />
          </div>
        )}
        <div className="space-y-4">
            {overviewData.stats.map(stat => (
                 <div key={stat.label} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                        <div className="text-primary">{stat.icon}</div>
                        <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <Badge variant={stat.label.includes('Score') ? "default" : "secondary"}>{stat.value}</Badge>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
