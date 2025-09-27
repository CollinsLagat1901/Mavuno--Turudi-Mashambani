'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles } from 'lucide-react';

export default function AiPersonalizationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary" /> AI Personalization</CardTitle>
        <CardDescription>
          Train Mavuno’s AI assistant to match your preferences. Your changes are saved automatically.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="ai-tone">Tone & Style</Label>
                 <Select defaultValue="friendly">
                    <SelectTrigger id="ai-tone">
                        <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="professional">Professional & Analytical</SelectItem>
                        <SelectItem value="friendly">Friendly & Helpful</SelectItem>
                        <SelectItem value="direct">Fast & Direct</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="ai-goal">Primary Goal</Label>
                 <Select defaultValue="price">
                    <SelectTrigger id="ai-goal">
                        <SelectValue placeholder="Select a primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="price">💰 Best Price Deals</SelectItem>
                        <SelectItem value="delivery">🚚 Fastest Delivery</SelectItem>
                        <SelectItem value="verified">🧾 Verified Farmers Only</SelectItem>
                        <SelectItem value="insights">📈 Market Insights First</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="ai-notes">Personal Notes for AI</Label>
            <Textarea 
                id="ai-notes"
                placeholder="Tell the AI what to remember. For example:&#10;- I buy maize in bulk monthly.&#10;- Always show me price changes in Rift Valley.&#10;- I prefer local suppliers."
                rows={4}
            />
            <p className="text-xs text-muted-foreground">The AI will use these notes to tailor its recommendations for you.</p>
        </div>
        <div className="flex justify-end">
            <Button variant="ghost" size="sm" disabled>
                Reset Personality
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
