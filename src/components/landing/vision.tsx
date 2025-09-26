import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Vision = () => {
  const visionImage = PlaceHolderImages.find((img) => img.id === 'vision-farm');
  
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
        {visionImage && (
            <Image
                src={visionImage.imageUrl}
                alt={visionImage.description}
                fill
                className="object-cover opacity-5"
                data-ai-hint={visionImage.imageHint}
            />
        )}
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary font-headline">
              Turudi Mashambani — Let’s Go Back to the Farms
            </h2>
            <p className="text-lg text-muted-foreground">
              We are reigniting Kenya’s agricultural heritage. By combining timeless farming wisdom with modern technology, we can build a more prosperous and food-secure nation for future generations. Mavuno is our commitment to this vision.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <blockquote className="w-full max-w-md p-6 border-l-4 rounded-r-lg shadow-lg border-secondary bg-card">
              <p className="text-lg italic leading-relaxed text-card-foreground md:text-xl">
                “Let us go back to our farms and build our nation through agriculture.”
              </p>
              <footer className="mt-4 text-sm font-semibold text-right text-muted-foreground">
                — A call to action for a prosperous Kenya
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
