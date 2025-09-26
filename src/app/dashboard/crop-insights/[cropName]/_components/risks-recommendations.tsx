'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const riskData = {
  risks: [
    { name: 'Armyworm Infestation', level: 'Medium', icon: <AlertTriangle className="text-destructive" /> },
    { name: 'Market Price Fluctuation', level: 'Low', icon: <AlertTriangle className="text-yellow-500" /> },
  ],
  recommendations: [
    'Monitor for pests in weeks 2-3',
    'Secure buyer contracts early to lock in prices',
    'Apply foliar fertilizer at week 4 for a growth boost',
  ],
};

export default function RisksRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Zap /> AI Risks & Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-sm mb-2">⚠️ Identified Risks</h4>
          <ul className="space-y-2">
            {riskData.risks.map((risk) => (
              <li key={risk.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                    {risk.icon}
                    <span className="text-sm">{risk.name}</span>
                </div>
                <Badge variant={risk.level === 'Medium' ? 'destructive' : 'secondary'} className="bg-opacity-80">{risk.level}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">✅ Recommendations</h4>
          <ul className="space-y-3">
            {riskData.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
