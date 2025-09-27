'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ShieldAlert, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function VerificationStatus() {
  const isVerified = false; // This would be dynamic based on user data
  const { toast } = useToast();

  const handleUploadClick = () => {
    toast({
      title: 'Coming Soon!',
      description: 'The document upload feature is currently under development.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isVerified ? <ShieldCheck className="text-primary" /> : <ShieldAlert className="text-yellow-500" />}
          Verification Status
        </CardTitle>
        <CardDescription>
          Verify your identity to build trust with farmers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <Badge variant={isVerified ? 'default' : 'secondary'} className="text-lg py-1 px-4">
          {isVerified ? 'Verified' : 'Pending Verification'}
        </Badge>
        <p className="text-sm text-muted-foreground">
          {isVerified 
            ? "Your account is verified. You have full access to the marketplace."
            : "Please upload the required documents to get your verified badge."
          }
        </p>
        <Button onClick={handleUploadClick} className="w-full">
            <Upload className="mr-2" />
            Upload Documents
        </Button>
      </CardContent>
    </Card>
  );
}
