import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import MavunoLogo from '@/components/icons/mavuno-logo';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
  ];

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center md:items-start gap-4">
                <MavunoLogo />
                <p className="text-center md:text-left">Mavuno — Turudi Mashambani 🌾</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-sm hover:text-primary transition-colors">
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
        <Separator className="my-8 bg-border" />
        <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-center">
                © {new Date().getFullYear()} Mavuno Insights. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                    <Link key={social.name} href={social.href} className="hover:text-primary transition-colors">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.name}</span>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
