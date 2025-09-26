import { MapPin, DatabaseZap, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: 'Step 1: Select Your Location',
      description: 'Choose your county and tell us what crops you are interested in growing.',
    },
    {
      icon: <DatabaseZap className="w-8 h-8 text-primary" />,
      title: 'Step 2: Instant AI Analysis',
      description: 'Mavuno analyzes market data, demand, soil trends, and regional suitability in real-time.',
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: 'Step 3: Get Recommendations',
      description: 'Receive personalized, data-driven recommendations on what to grow for maximum profit.',
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            How Mavuno Works
          </h2>
          <p className="max-w-3xl text-muted-foreground md:text-xl/relaxed">
            A simple, three-step journey to smarter farming and greater profits.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col text-center items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                 <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-accent">
                    {step.icon}
                </div>
                <CardTitle className="text-xl font-semibold font-headline">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
