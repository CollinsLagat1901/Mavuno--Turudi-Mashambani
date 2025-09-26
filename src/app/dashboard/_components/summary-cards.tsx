'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, TrendingUp, CloudRain, TestTube2 } from 'lucide-react';

const summaryData = [
  {
    title: 'Best Crop to Plant Today',
    value: 'Maize',
    icon: <Sprout className="h-4 w-4 text-muted-foreground" />,
    change: 'Nakuru County',
  },
  {
    title: 'Market Trend',
    value: 'Prices rising',
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    change: '+5% this week',
  },
  {
    title: 'Weather Forecast',
    value: 'Rain expected',
    icon: <CloudRain className="h-4 w-4 text-muted-foreground" />,
    change: 'in next 3 days',
  },
  {
    title: 'Soil Status',
    value: 'Neutral pH',
    icon: <TestTube2 className="h-4 w-4 text-muted-foreground" />,
    change: 'Suitable for maize',
  },
];

export default function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
