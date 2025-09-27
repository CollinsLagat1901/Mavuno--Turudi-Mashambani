
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import CallToAction from '@/components/landing/call-to-action';

const PrivacyPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <section className="bg-accent py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="max-w-3xl mx-auto space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline text-primary">
                                Privacy Policy
                            </h1>
                            <p className="text-lg md:text-xl text-accent-foreground/90">
                                Your privacy is important to us. This policy explains how we handle your personal data.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
                    <h2 className="text-2xl font-bold">1. Introduction</h2>
                    <p className="text-muted-foreground">This Privacy Policy outlines how Mavuno AI ("we", "us", or "our") collects, uses, and protects your personal information when you use our services. By using Mavuno AI, you agree to the collection and use of information in accordance with this policy.</p>

                    <h2 className="text-2xl font-bold">2. Information We Collect</h2>
                    <p className="text-muted-foreground">We may collect the following types of information:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Personal Identification Information:</strong> Name, email address, phone number.</li>
                            <li><strong>Farm Data:</strong> Location, size, soil type, crops planted, and other agricultural data you provide.</li>
                            <li><strong>Usage Data:</strong> Information on how you interact with our application.</li>
                        </ul>
                    </p>

                    <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
                    <p className="text-muted-foreground">We use the information we collect to:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Provide and personalize our AI-driven recommendations.</li>
                            <li>Improve and maintain our services.</li>
                            <li>Communicate with you, including sending notifications and updates.</li>
                            <li>Connect you with other users of the platform (e.g., buyers, transporters) as part of our service.</li>
                        </ul>
                    </p>

                     <h2 className="text-2xl font-bold">4. Data Sharing and Disclosure</h2>
                    <p className="text-muted-foreground">We do not sell your personal data. We may share your information with third parties only in the following circumstances:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>With your explicit consent.</li>
                            <li>To comply with legal obligations.</li>
                            <li>With trusted service providers who assist us in operating our platform, under strict confidentiality agreements.</li>
                        </ul>
                    </p>
                    
                    <h2 className="text-2xl font-bold">5. Data Security</h2>
                    <p className="text-muted-foreground">We are committed to protecting your data. We use industry-standard security measures to prevent unauthorized access, disclosure, or alteration of your information.</p>

                    <h2 className="text-2xl font-bold">6. Changes to This Privacy Policy</h2>
                    <p className="text-muted-foreground">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                    <h2 className="text-2xl font-bold">7. Contact Us</h2>
                    <p className="text-muted-foreground">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:theeentity.co@gmail.com" className="text-primary underline">theeentity.co@gmail.com</a>.</p>
                </section>
                <CallToAction />
            </main>
            <Footer />
        </div>
    );
}

export default PrivacyPage;
