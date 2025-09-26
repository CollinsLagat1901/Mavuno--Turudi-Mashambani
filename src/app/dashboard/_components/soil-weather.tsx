'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Sun, Thermometer, TestTube } from 'lucide-react';

const soilData = {
  ph: '6.8 (Neutral)',
  fertility: 'Good',
  moisture: 'Medium',
};

const weatherData = {
  temperature: '24°C',
  rainfall: '5mm expected',
  forecast: 'Rain in 2 days',
};

export default function SoilWeather() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Soil Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <TestTube className="h-5 w-5 mr-3 text-primary" />
            <span>pH: {soilData.ph}</span>
          </div>
          <div className="flex items-center">
            <Droplets className="h-5 w-5 mr-3 text-primary" />
            <span>Moisture: {soilData.moisture}</span>
          </div>
           <div className="flex items-center">
            <Sun className="h-5 w-5 mr-3 text-primary" />
            <span>Fertility: {soilData.fertility}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Weather Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 mr-3 text-destructive" />
            <span>Temp: {weatherData.temperature}</span>
          </div>
          <div className="flex items-center">
            <Droplets className="h-5 w-5 mr-3 text-blue-500" />
            <span>Rainfall: {weatherData.rainfall}</span>
          </div>
          <p className="text-sm text-muted-foreground pt-2">
            Suggestion: Based on current conditions, consider planting in 2 days.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
