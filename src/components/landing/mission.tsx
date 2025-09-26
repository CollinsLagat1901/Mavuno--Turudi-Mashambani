import { BarChart, Sprout, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Mission = () => {
  const features = [
    {
      icon: <BarChart className="w-8 h-8 text-secondary" />,
      title: 'Market Insights',
      description: 'Real-time data on what crops are in demand and where to sell them.',
    },
    {
      icon: <Sprout className="w-8 h-8 text-secondary" />,
      title: 'Region-Based Recommendations',
      description: 'Tailored advice based on your specific county’s climate and soil.',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-secondary" />,
      title: 'Profit Optimization',
      description: 'Guidance to help you maximize profitability for every harvest.',
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Empowering Kenyan Farmers with Data-Driven Decisions
          </h2>
          <p className="max-w-3xl text-accent-foreground/80 md:text-xl/relaxed">
            Mavuno uses real-time market insights, regional data, and AI-driven intelligence to guide farmers on what crops to grow, when to plant, and where to sell — ensuring every harvest is profitable.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-background shadow-md">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold font-headline">{feature.title}</h3>
              <p className="mt-2 text-accent-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
