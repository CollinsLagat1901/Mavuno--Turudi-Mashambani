import { BrainCircuit } from 'lucide-react';

const PoweredBy = () => {
  return (
    <section className="w-full py-6 md:py-8 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <BrainCircuit className="w-5 h-5 text-primary" />
          <p>
            Powered by <span className="font-bold text-foreground">Entity AI</span> — the intelligence engine behind Mavuno.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PoweredBy;
