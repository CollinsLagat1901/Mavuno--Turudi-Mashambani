import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MavunoLogo from '@/components/icons/mavuno-logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AuthForm } from './_components/auth-form';
import { Button } from '@/components/ui/button';

export default function AuthenticationPage() {
  const authImage = PlaceHolderImages.find((img) => img.id === 'auth-hero');

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        {authImage && (
          <Image
            src={authImage.imageUrl}
            alt={authImage.description}
            fill
            className="absolute inset-0 object-cover"
            data-ai-hint={authImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/70 to-green-900/60" />
        <div className="relative z-20">
          <Link href="/" className="flex items-center text-lg font-medium">
            <MavunoLogo />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-2xl font-bold md:text-4xl">
              &ldquo;Grow what sells.
              <br />
              Join Mavuno and harvest prosperity.&rdquo;
            </p>
            <footer className="text-md font-medium">Powered by Entity AI</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
           <div className="flex flex-col items-center text-center gap-2">
             <div className="lg:hidden">
                <MavunoLogo />
             </div>
            <h1 className="text-3xl font-bold text-primary">Mavuno Insights</h1>
            <p className="text-balance text-muted-foreground">
              Sign in or create an account to get started.
            </p>
             <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
          </div>

          <AuthForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
