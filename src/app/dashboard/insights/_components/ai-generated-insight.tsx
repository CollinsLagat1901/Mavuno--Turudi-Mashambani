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
import { Loader2, Wand2, Lightbulb, TrendingUp, Users, DollarSign, CheckCircle, TestTube, AlertTriangle, Calendar } from 'lucide-react';
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
            <CardContent className="space-y-6 p-6">
                
                {/* Recommended Crops */}
                <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><TrendingUp /> Top 3 Recommended Crops</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {insight.recommendedCrops.map((crop, index) => (
                            <Card key={index} className="bg-background">
                                <CardHeader>
                                    <CardTitle className="text-base">{crop.cropName}</CardTitle>
                                    <CardDescription>Est. Profit: <span className="font-bold text-primary">KES {crop.expectedProfit.toLocaleString()}</span></CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">{crop.reasoning}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Soil & Weather */}
                    <div className="space-y-4">
                         <div>
                            <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><TestTube /> Soil Recommendation</h4>
                            <p className="text-sm">{insight.soilRecommendation}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><Calendar /> Weather & Planting Summary</h4>
                            <p className="text-sm">{insight.weatherSummary}</p>
                        </div>
                    </div>
                     {/* Risks */}
                    <div className="space-y-4">
                         <div>
                            <h4 className="font-semibold text-md mb-2 flex items-center gap-2"><AlertTriangle /> Disease & Risk Warnings</h4>
                            <div className="space-y-2">
                            {insight.diseaseWarnings.map((warning, index) => (
                                <div key={index} className="text-sm p-2 bg-background rounded-md">
                                    <div className="flex justify-between items-center">
                                       <span className="font-medium">{warning.disease}</span>
                                       <Badge variant={warning.probability === 'high' ? 'destructive' : 'secondary'}>{warning.probability}</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Prevention: {warning.prevention}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <Separator />

                {/* Next Steps */}
                <div>
                     <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><CheckCircle className="text-green-500"/> Actionable Next Steps</h4>
                     <ul className="space-y-2">
                        {insight.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-100 mt-0.5">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                </div>
                                <span className="text-sm">{step}</span>
                            </li>
                        ))}
                     </ul>
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
