'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Zap, TrendingUp, Sparkles } from 'lucide-react';

export default function MarketHighlights() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <MapPin /> Recommended Market
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xl font-bold">Nakuru Town Market</p>
          <p className="text-sm text-muted-foreground">Distance: 45 km</p>
          <p className="text-sm">Current Maize Price: <span className="font-bold text-primary">KES 65/kg</span></p>
          <p className="text-sm">Profit Increase: <span className="font-bold">+KES 12,000</span></p>
          <Button size="sm" className="w-full">Get Directions</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp /> Price Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-medium">Maize prices in your region are expected to rise by <span className="text-primary font-bold">8%</span> next week due to reduced supply.</p>
          <div className="p-3 bg-accent rounded-lg">
             <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-secondary flex-shrink-0" />
                <p className="text-sm text-accent-foreground">
                    <span className="font-semibold">AI Tip:</span> Consider holding your stock until Monday for better profits.
                </p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="w-full">Ask AI for Strategy</Button>
        </CardContent>
      </Card>
       <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sparkles /> Insights Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span>Highest Price Crop Today:</span>
            <span className="font-bold">Tomatoes (KES 130)</span>
          </div>
           <div className="flex justify-between items-center">
            <span>Best County to Sell:</span>
            <span className="font-bold">Kiambu</span>
          </div>
           <div className="flex justify-between items-center">
            <span>Top Profit Opportunity:</span>
            <span className="font-bold">Beans in Eldoret (+20%)</span>
          </div>
           <div className="p-3 bg-blue-50 rounded-lg text-blue-800 border border-blue-200">
            <p className="font-semibold">Hot Request:</p>
            <p>Export firm in Nairobi seeks 5 tons of Avocado.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
