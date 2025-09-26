import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Map, Users, Lightbulb } from 'lucide-react';
import Image from 'next/image';

const stats = [
    { label: 'Planting Maize', value: '45%' },
    { label: 'Planting Beans', value: '30%' },
    { label: 'Planting Vegetables', value: '15%' },
    { label: 'Other', value: '10%' },
]

export default function RegionalInsight() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What Farmers Near You Are Doing</CardTitle>
        <CardDescription>Based on anonymized data from Nakuru County.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
            {stats.map(stat => (
                <div key={stat.label} className="p-2 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
            ))}
        </div>
        <div className="relative h-40 w-full rounded-lg overflow-hidden">
             <Image
                src="https://picsum.photos/seed/kenya-map/600/400"
                alt="Map of Nakuru County showing crop distribution"
                fill
                className="object-cover opacity-30"
                data-ai-hint="kenya map"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center font-bold text-lg text-foreground/80 p-4 bg-background/50 rounded-lg">
                    <Map className="inline-block h-6 w-6 mr-2 text-primary" />
                    Crop Heatmap (Coming Soon)
                </p>
              </div>
        </div>
         <div className="p-3 bg-accent rounded-lg flex items-start gap-3">
            <div className="flex-shrink-0"><Lightbulb className="text-secondary" /></div>
            <p className="text-sm text-accent-foreground">
                <span className="font-semibold">Tip:</span> Planting maize aligns with local trends, which can improve access to shared resources and buyers.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
