'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TrendingUp, Sprout, ShieldCheck } from 'lucide-react';
import { DynamicCropRecommendationsOutput } from '@/ai/flows/dynamic-crop-recommendations';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';


const placeholderCrops = [
  { name: 'Maize', imageId: 'maize-crop', href: '/dashboard/crop-insights/maize' },
  { name: 'Tomatoes', imageId: 'tomato-crop', href: '/dashboard/crop-insights/tomatoes' },
  { name: 'Beans', imageId: 'beans-crop', href: '/dashboard/crop-insights/beans' },
];

const staticDetails = {
    'Maize': { marketTrend: '+5% this week', growingSeason: '3-4 months', risk: 'Low', profitMargin: '25%', marketPrice: '40 KES/kg' },
    'Tomatoes': { marketTrend: '+8% this week', growingSeason: '3 months', risk: 'Medium', profitMargin: '35%', marketPrice: '60 KES/kg' },
    'Beans': { marketTrend: '-2% this week', growingSeason: '2-3 months', risk: 'Low', profitMargin: '20%', marketPrice: '80 KES/kg' },
    'Potatoes': { marketTrend: '0% this week', growingSeason: '3-4 months', risk: 'Medium', profitMargin: '30%', marketPrice: '50 KES/kg' },
};

type CropName = keyof typeof staticDetails;

export default function CropRecommendations({ recommendations }: { recommendations: DynamicCropRecommendationsOutput | null }) {
  
  const recommendedCropNames = recommendations?.recommendedCrops.split(',').map(s => s.trim()) || [];
  
  const cropData = placeholderCrops.map(crop => {
      const isRecommended = recommendedCropNames.includes(crop.name);
      const detailsKey = crop.name as CropName;
      const details = staticDetails[detailsKey] || staticDetails['Maize'];
      return {
          ...crop,
          details,
          isRecommended,
          profitMargin: details.profitMargin,
          marketPrice: details.marketPrice,
      }
  }).sort((a, b) => {
    // Sort recommended crops to the front
    if (a.isRecommended && !b.isRecommended) return -1;
    if (!a.isRecommended && b.isRecommended) return 1;
    return 0;
  });


  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>Top 3 AI Crop Recommendations</CardTitle>
        {recommendations && (
            <Alert className="bg-primary/5 border-primary/20 mt-2">
                 <Lightbulb className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary font-semibold">AI Reasoning</AlertTitle>
                <AlertDescription>
                   {recommendations.reasoning}
                </AlertDescription>
            </Alert>
        )}
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        {cropData.map((crop) => {
          const cropImage = PlaceHolderImages.find(
            (img) => img.id === crop.imageId
          );
          return (
            <Card key={crop.name} className={`overflow-hidden ${crop.isRecommended ? 'border-2 border-primary' : ''}`}>
              {cropImage && (
                <div className="relative h-60 w-full">
                  <Image
                    src={cropImage.imageUrl}
                    alt={crop.name}
                    fill
                    className="object-cover"
                    data-ai-hint={cropImage.imageHint}
                  />
                  {crop.isRecommended && (
                     <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">Recommended</div>
                  )}
                </div>
              )}
              <CardHeader>
                <CardTitle>{crop.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Profit Margin:</strong> {crop.profitMargin}
                </p>
                <p>
                  <strong>Market Price:</strong> {crop.marketPrice}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-2">
                      Show Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{crop.name} Details</DialogTitle>
                      <DialogDescription>
                        Key insights for {crop.name} based on your farm's data.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex items-center">
                            <TrendingUp className="mr-3 h-5 w-5 text-primary" />
                            <span>Market Trend: <strong>{crop.details.marketTrend}</strong></span>
                        </div>
                         <div className="flex items-center">
                            <Sprout className="mr-3 h-5 w-5 text-primary" />
                            <span>Growing Season: <strong>{crop.details.growingSeason}</strong></span>
                        </div>
                         <div className="flex items-center">
                            <ShieldCheck className="mr-3 h-5 w-5 text-primary" />
                            <span>Pest/Disease Risk: <strong>{crop.details.risk}</strong></span>
                        </div>
                    </div>
                     <Button asChild className="w-full mt-2">
                        <Link href={crop.href}>View Full Insight Report</Link>
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
