
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { MapPin, DatabaseZap, Lightbulb, UserCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CallToAction from '@/components/landing/call-to-action';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const HowItWorksPage = () => {
    const steps = [
        {
          icon: <UserCheck className="w-10 h-10 text-primary" />,
          title: 'Step 1: Tell Us About Your Farm',
          description: 'Complete a simple profile with your location, farm size, and crops of interest. This gives our AI the context it needs to provide personalized advice.',
        },
        {
          icon: <DatabaseZap className="w-10 h-10 text-primary" />,
          title: 'Step 2: Instant AI Analysis',
          description: 'Mavuno’s AI engine instantly analyzes real-time market prices, local weather patterns, soil data for your county, and regional crop demand.',
        },
        {
          icon: <Lightbulb className="w-10 h-10 text-primary" />,
          title: 'Step 3: Get Actionable Insights',
          description: 'Receive a personalized dashboard with clear recommendations on what to plant, when to plant, and where to sell for maximum profitability.',
        },
      ];
    
    const heroImage = PlaceHolderImages.find((img) => img.id === 'how-it-works-hero');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
            {heroImage && (
                 <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-primary/80" />
            <div className="relative container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline text-primary-foreground">
                        How Mavuno Works
                    </h1>
                    <p className="text-lg md:text-xl text-primary-foreground/90">
                        A simple, three-step journey to smarter farming and greater profits. We turn data into decisions.
                    </p>
                </div>
            </div>
        </section>

        {/* Steps Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
                <div className="relative grid gap-12 md:grid-cols-3">
                {steps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center text-center">
                         <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-accent border-4 border-background shadow-lg">
                            {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold font-headline mb-2">{step.title}</h3>
                        <p className="text-muted-foreground max-w-xs">{step.description}</p>
                    </div>
                ))}
                </div>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
