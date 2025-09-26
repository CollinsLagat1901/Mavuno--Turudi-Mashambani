'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Zap } from 'lucide-react';

const forecastData = {
  yield: '12,500 kg total',
  price: 'KES 40/kg',
  revenue: 'KES 500,000',
  cost: 'KES 200,000',
  profit: 'KES 300,000',
  aiNote: 'With current trends, maize offers a 60% return on investment this season.'
};

const dataPoints = [
    { label: 'Expected Yield (5 acres)', value: forecastData.yield },
    { label: 'Current Average Price', value: forecastData.price },
    { label: 'Projected Revenue', value: forecastData.revenue },
    { label: 'Estimated Cost', value: forecastData.cost, isCost: true },
    { label: 'Net Profit', value: forecastData.profit, isProfit: true },
]

export default function FinancialForecast() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><DollarSign /> Financial Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="divide-y divide-border rounded-md border">
            {dataPoints.map(point => (
                <div key={point.label} className="flex items-center justify-between p-3">
                    <p className="text-sm text-muted-foreground">{point.label}</p>
                    <p className={`text-sm font-bold ${point.isCost ? 'text-destructive' : ''} ${point.isProfit ? 'text-primary' : ''}`}>{point.value}</p>
                </div>
            ))}
        </div>
        <div className="p-4 bg-accent rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0"><Zap className="text-primary" /></div>
            <div>
              <h4 className="font-semibold text-primary">AI Note</h4>
              <p className="text-sm text-accent-foreground">{forecastData.aiNote}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
