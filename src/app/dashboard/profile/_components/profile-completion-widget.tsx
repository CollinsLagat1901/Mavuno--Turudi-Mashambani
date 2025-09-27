
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileCompletionProps {
    percentage: number;
    loading: boolean;
}

export default function ProfileCompletion({ percentage, loading }: ProfileCompletionProps) {
  return (
    <Card className="bg-accent border-primary/20">
      <CardHeader>
        <CardTitle>
            {loading ? <Skeleton className="h-7 w-48" /> : `Your Profile is ${percentage}% Complete`}
        </CardTitle>
        <CardDescription>
          {loading ? <Skeleton className="h-4 w-full mt-1" /> :
           percentage < 100 ? "Add your soil test results for more accurate crop recommendations." : "Your profile is complete! You'll get the most accurate recommendations."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? <Skeleton className="h-4 w-full rounded-full" /> : <Progress value={percentage} />}
        <Button className="w-full" disabled={loading || percentage === 100}>
            {percentage < 100 ? "Complete My Profile" : "Profile Complete"}
        </Button>
      </CardContent>
    </Card>
  );
}
