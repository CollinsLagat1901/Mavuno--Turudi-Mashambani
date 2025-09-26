import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Mission from '@/components/landing/mission';
import HowItWorks from '@/components/landing/how-it-works';
import ValueProposition from '@/components/landing/value-proposition';
import CallToAction from '@/components/landing/call-to-action';
import Vision from '@/components/landing/vision';
import PoweredBy from '@/components/landing/powered-by';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Mission />
        <HowItWorks />
        <ValueProposition />
        <CallToAction />
        <Vision />
        <PoweredBy />
      </main>
      <Footer />
    </div>
  );
}
