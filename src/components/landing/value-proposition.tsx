import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ValueProposition = () => {
  const features = [
    { text: 'Data-backed crop guidance' },
    { text: 'Real-time market prices' },
    { text: 'Region-specific insights' },
    { text: 'Simple, farmer-friendly platform' },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Why Choose Mavuno?
          </h2>
          <p className="max-w-2xl text-muted-foreground md:text-xl/relaxed">
            We provide the tools and insights you need to succeed in today's agricultural market.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background/50 shadow-sm hover:bg-background transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 mt-1 text-primary flex-shrink-0" />
                  <p className="text-lg font-medium text-left">{feature.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
