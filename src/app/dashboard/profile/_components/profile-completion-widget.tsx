'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function ProfileCompletion() {
  return (
    <Card className="bg-accent border-primary/20">
      <CardHeader>
        <CardTitle>Your Profile is 85% Complete</CardTitle>
        <CardDescription>
          Add your soil test results for more accurate crop recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={85} />
        <Button className="w-full" disabled>Complete My Profile</Button>
      </CardContent>
    </Card>
  );
}
