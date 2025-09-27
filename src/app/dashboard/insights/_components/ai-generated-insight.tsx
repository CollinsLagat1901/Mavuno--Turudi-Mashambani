'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { useToast } from '@/hooks/use-toast';
import {
  generateInsights,
  GenerateInsightsOutput,
  GenerateInsightsInput,
} from '@/ai/flows/generate-insights-flow';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, Lightbulb, TrendingUp, Users, DollarSign, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface AIGeneratedInsightProps {
  submission: any;
  loading: boolean;
  userId: string | undefined;
}

export default function AIGeneratedInsight({ submission, loading, userId }: AIGeneratedInsightProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [insight, setInsight] = useState<GenerateInsightsOutput | null>(null);
  const [insightLoading, setInsightLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInsight = async () => {
      if (submission?.aiInsightsGenerated && submission.aiInsightId) {
        setInsightLoading(true);
        const insightRef = doc(db, 'aiInsights', submission.aiInsightId);
        const insightSnap = await getDoc(insightRef);
        if (insightSnap.exists()) {
          setInsight(insightSnap.data() as GenerateInsightsOutput);
        }
        setInsightLoading(false);
      } else {
        setInsight(null);
        setInsightLoading(false);
      }
    };

    fetchInsight();
  }, [submission]);

  const handleGenerateInsight = async () => {
    if (!submission || !userId) {
      toast({
        variant: 'destructive',
        title: 'Submission not found',
        description: 'Please complete your farm details first.',
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Prepare input for the AI flow
      const flowInput: GenerateInsightsInput = {
        soilType: submission.soilType,
        landSize: submission.landSize,
        county: submission.location.county,
        subCounty: submission.location.subCounty,
        cropsPlanted: submission.cropsPlanted,
        cropPreferences: submission.cropPreferences,
        irrigationAvailable: submission.irrigationAvailable,
        lastSeasonYield: submission.lastSeasonYield,
        farmingChallenges: submission.farmingChallenges,
      };

      const result = await generateInsights(flowInput);

      // Save the new insight to Firestore
      const insightRef = await addDoc(collection(db, 'aiInsights'), {
        ...result,
        userId: userId,
        submissionId: submission.id,
        createdAt: serverTimestamp(),
      });
      
      // Update the original submission
      const submissionRef = doc(db, 'farmerSubmissions', submission.id);
      await setDoc(submissionRef, {
        aiInsightsGenerated: true,
        aiInsightId: insightRef.id
      }, { merge: true });

      setInsight(result);
      toast({
        title: 'Insights Generated!',
        description: 'Your personalized report is ready.',
      });

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to generate insights',
        description: error.message,
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (loading) {
    return <Skeleton className="h-96 w-full" />
  }

  if (!submission) {
     return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle>No Farm Data Found</CardTitle>
                <CardDescription>Please submit your farm details to generate AI insights.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>Go to Farm Details</Button>
            </CardContent>
        </Card>
     )
  }
  
  if (insightLoading) {
      return <Skeleton className="h-96 w-full" />
  }

  if (insight) {
    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Lightbulb /> Your Personal AI-Generated Insight
                </CardTitle>
                <CardDescription>
                    Analysis complete! Here is the custom report for your farm based on your latest submission.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><CheckCircle className="text-green-500" /> Top Recommended Crops</h4>
                    <div className="flex gap-2">
                        {insight.recommendedCrops.map(crop => <Badge key={crop}>{crop}</Badge>)}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-background/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><TrendingUp /> Profitability</div>
                        <p className="text-xl font-bold text-primary">{(insight.profitabilityScore * 100).toFixed(0)}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><DollarSign /> Expected Yield</div>
                        <p className="text-xl font-bold">{insight.expectedYield}</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Users /> Suggested Buyers</h4>
                    <ul className="space-y-1 text-sm">
                        {insight.suggestedBuyers.map(buyer => (
                            <li key={buyer.name} className="flex justify-between">
                                <span>{buyer.name} ({buyer.location})</span>
                                <span className="font-mono text-muted-foreground">{buyer.contact}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator />
                <div>
                     <h4 className="font-semibold text-sm mb-2">Entity AI's Advice</h4>
                    <p className="text-sm text-foreground/90">{insight.advice}</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Ready for Your AI Insights?</CardTitle>
        <CardDescription>
          Click the button below to have Entity AI analyze your latest farm
          submission and generate personalized recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerateInsight} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate AI Insights
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
