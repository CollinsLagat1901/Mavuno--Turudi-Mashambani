import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from './_components/contact-form';

const ContactPage = () => {
    const contactDetails = [
        { icon: <Phone />, title: "Phone", value: "+254 708 889 016" },
        { icon: <Mail />, title: "Email", value: "theeentity.co@gmail.com" },
        { icon: <MapPin />, title: "Location", value: "Nairobi, Kenya" },
    ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-accent py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline text-primary">
                        Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl text-accent-foreground/90">
                        We’re here to help. Whether you have a question, feedback, or need support, please reach out to us.
                    </p>
                </div>
            </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline">Contact Information</h2>
                        <p className="text-muted-foreground">Find us at the following contact points.</p>
                    </div>
                     <div className="space-y-6">
                        {contactDetails.map((detail) => (
                          <div key={detail.title} className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-primary mt-1">
                              {detail.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{detail.title}</h3>
                              <p className="text-muted-foreground">{detail.value}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
                <div>
                   <ContactForm />
                </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
