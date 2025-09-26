'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const marketData = {
  markets: [
    { name: 'Nakuru', price: 'KES 40/kg' },
    { name: 'Eldoret', price: 'KES 42/kg' },
    { name: 'Nairobi', price: 'KES 45/kg' },
  ],
  aiSuggestion: 'Selling in Nairobi offers 12% higher returns. Connect with buyers there for maximum profit.'
};

export default function MarketAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><MapPin /> Nearby Market Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketData.markets.map((market) => (
            <div key={market.name} className="p-4 rounded-lg border text-center">
              <p className="font-semibold">{market.name}</p>
              <p className="text-lg font-bold text-primary">{market.price}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-accent rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0"><Zap className="text-primary" /></div>
            <div>
              <h4 className="font-semibold text-primary">AI Suggestion</h4>
              <p className="text-sm text-accent-foreground">{marketData.aiSuggestion}</p>
            </div>
          </div>
        </div>
        <Button className="w-full" disabled>
          View Buyers
          <ArrowRight className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
