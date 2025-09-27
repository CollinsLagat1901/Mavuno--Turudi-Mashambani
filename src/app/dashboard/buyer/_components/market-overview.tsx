
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Zap, TrendingUp, Sparkles, Tag } from 'lucide-react';

export default function MarketOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Tag /> Best Value Deal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xl font-bold">Bulk Maize from Eldoret</p>
          <p className="text-sm text-muted-foreground">Farmer: GreenFields Ltd.</p>
          <p className="text-sm">Price: <span className="font-bold text-primary">KES 50/kg</span></p>
          <p className="text-sm">Value: <span className="font-bold">15% below market avg.</span></p>
          <Button size="sm" className="w-full">View Deal</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp /> Price Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-medium">Avocado prices are expected to drop by <span className="text-destructive font-bold">10%</span> next week as harvest season peaks.</p>
          <div className="p-3 bg-accent rounded-lg">
             <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-secondary flex-shrink-0" />
                <p className="text-sm text-accent-foreground">
                    <span className="font-semibold">AI Tip:</span> Advise farmers to sell now, or plan your purchase for next week to save.
                </p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="w-full">See Full Report</Button>
        </CardContent>
      </Card>
       <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sparkles /> Market Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span>Highest Price Crop Today:</span>
            <span className="font-bold">Tomatoes (KES 130)</span>
          </div>
           <div className="flex justify-between items-center">
            <span>Cheapest County for Beans:</span>
            <span className="font-bold">Nakuru</span>
          </div>
           <div className="flex justify-between items-center">
            <span>Fastest Growing Price:</span>
            <span className="font-bold">Tomatoes in Kiambu (+8%)</span>
          </div>
           <div className="p-3 bg-blue-50 rounded-lg text-blue-800 border border-blue-200">
            <p className="font-semibold">New Listing:</p>
            <p>10 tons of Grade A potatoes from Nyandarua just listed.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    