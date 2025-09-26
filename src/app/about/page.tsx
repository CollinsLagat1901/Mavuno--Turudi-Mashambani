import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Target, AlertTriangle, Users, CheckCircle } from 'lucide-react';
import CallToAction from '@/components/landing/call-to-action';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const AboutPage = () => {
    const aboutHeroImage = PlaceHolderImages.find((img) => img.id === 'vision-farm');

    const teamMembers = [
        {
            name: 'Thee Entity',
            role: 'Lead AI Partner',
            avatar: 'https://avatar.vercel.sh/thee-entity.png',
            bio: 'Thee Entity is the intelligence engine behind Mavuno, responsible for data analysis, predictive modeling, and generating the insights that empower our farmers.'
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative w-full h-96">
                    {aboutHeroImage && (
                        <Image
                            src={aboutHeroImage.imageUrl}
                            alt={aboutHeroImage.description}
                            fill
                            className="object-cover"
                            priority
                            data-ai-hint={aboutHeroImage.imageHint}
                        />
                    )}
                    <div className="absolute inset-0 bg-primary/70" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground px-4">
                        <div className="max-w-4xl space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
                                About Mavuno AI
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl">
                                Empowering Kenyan farmers with data-driven decisions for a prosperous future.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission and Vision Section */}
                <section className="py-16 md:py-24 bg-accent">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter text-primary font-headline">Our Vision</h2>
                                <p className="text-lg text-accent-foreground/90">
                                    To create a transformed agricultural economy where every Kenyan farmer can make informed, profitable decisions using the power of data and AI.
                                </p>
                            </div>
                            <div className="space-y-4">
                                 <h2 className="text-3xl font-bold tracking-tighter text-primary font-headline">Our Mission</h2>
                                <p className="text-lg text-accent-foreground/90">
                                   To deliver accessible, localized, and actionable AI-driven insights through a transparent marketplace, maximizing farmer revenue and ensuring buyers can access high-quality produce fairly.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Problem Section */}
                <section className="py-16 md:py-24 bg-background">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="max-w-3xl mx-auto space-y-4 mb-12">
                             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                                The Challenge We Address
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Kenyan farmers face critical information gaps that limit their potential. We are here to bridge that gap.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            <Card className="text-left">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="w-8 h-8 text-destructive" />
                                        <h3 className="text-xl font-semibold">Lack of Market Data</h3>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>Farmers often lack timely, localized market price data, leading to poor crop choices, revenue loss, and over-reliance on middlemen.</p>
                                </CardContent>
                            </Card>
                             <Card className="text-left">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="w-8 h-8 text-destructive" />
                                        <h3 className="text-xl font-semibold">Inefficient Supply Chains</h3>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>Buyers struggle to find reliable, quality produce, while farmers find it hard to connect with the best markets for their crops.</p>
                                </CardContent>
                            </Card>
                             <Card className="text-left">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                         <AlertTriangle className="w-8 h-8 text-destructive" />
                                        <h3 className="text-xl font-semibold">Limited Agronomic Insights</h3>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>Access to tailored advice on soil health, weather patterns, and disease prevention is often limited, resulting in wasted inputs and lower yields.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                
                 {/* Team Section */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="max-w-3xl mx-auto space-y-4 mb-12">
                             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                                Meet the Team
                            </h2>
                            <p className="text-lg text-muted-foreground">
                               The minds behind Mavuno AI.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-1 max-w-2xl mx-auto">
                            {teamMembers.map((member) => (
                                <Card key={member.name} className="text-left overflow-hidden">
                                    <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                                        <Avatar className="w-24 h-24 border-4 border-primary">
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-2 text-center sm:text-left">
                                            <h3 className="text-xl font-bold">{member.name}</h3>
                                            <p className="font-semibold text-primary">{member.role}</p>
                                            <p className="text-sm text-muted-foreground">{member.bio}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <CallToAction />
            </main>
            <Footer />
        </div>
    );
}

export default AboutPage;
