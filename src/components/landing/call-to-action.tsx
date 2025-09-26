import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
            Start your journey to smarter farming today.
          </h2>
          <p className="max-w-3xl text-muted-foreground md:text-xl">
            Join hundreds of Kenyan farmers who are transforming their harvests with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/auth">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
