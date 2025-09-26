'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const cropData = [
  {
    name: 'Maize',
    profitMargin: '25%',
    marketPrice: '40 KES/kg',
    imageId: 'maize-crop',
    href: '/dashboard/crop-insights/maize',
  },
  {
    name: 'Tomatoes',
    profitMargin: '35%',
    marketPrice: '60 KES/kg',
    imageId: 'tomato-crop',
    href: '/dashboard/crop-insights/tomatoes',
  },
  {
    name: 'Beans',
    profitMargin: '20%',
    marketPrice: '80 KES/kg',
    imageId: 'beans-crop',
    href: '/dashboard/crop-insights/beans',
  },
];

export default function CropRecommendations() {
  return (
     <Card className="col-span-1 lg:col-span-4">
        <CardHeader>
          <CardTitle>Top 3 AI Crop Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          {cropData.map((crop) => {
            const cropImage = PlaceHolderImages.find((img) => img.id === crop.imageId);
            return (
              <Card key={crop.name} className="overflow-hidden">
                {cropImage && (
                    <div className="relative h-60 w-full">
                        <Image
                        src={cropImage.imageUrl}
                        alt={crop.name}
                        fill
                        className="object-cover"
                        data-ai-hint={cropImage.imageHint}
                        />
                    </div>
                )}
                <CardHeader>
                  <CardTitle>{crop.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Profit Margin:</strong> {crop.profitMargin}</p>
                    <p><strong>Market Price:</strong> {crop.marketPrice}</p>
                    <Button asChild className="w-full mt-2">
                        <Link href={crop.href}>View Details</Link>
                    </Button>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>
  );
}
