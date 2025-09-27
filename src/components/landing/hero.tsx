import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-farmer');

  return (
    <section className="relative w-full h-[calc(100vh-4rem)]">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-foreground px-4">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            <span className="text-primary">🌾 Mavuno</span> — Turudi Mashambani
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl">
            Smart farming insights for every Kenyan farmer.
          </p>
          <p className="text-xl font-semibold text-secondary md:text-2xl lg:text-3xl">
            Grow what sells. Harvest prosperity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/auth">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link href="#">Watch Demo</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce">
            <ArrowDown className="w-8 h-8 text-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
