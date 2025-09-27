
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import MavunoLogo from '@/components/icons/mavuno-logo';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Impact', href: '/impact' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <MavunoLogo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-foreground',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" asChild>
            <Link href="/auth">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth">Get Started</Link>
          </Button>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                 <Link href="/" onClick={() => setIsSheetOpen(false)}>
                    <MavunoLogo />
                </Link>
              </div>
              <nav className="flex flex-col gap-4 p-4 flex-grow">
                {navLinks.map((link) => (
                  <SheetClose key={link.name} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-lg font-medium",
                        pathname === link.href ? 'text-primary' : 'text-foreground'
                      )}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="p-4 mt-auto border-t">
                  <div className="flex flex-col gap-2">
                      <SheetClose asChild>
                        <Button variant="outline" asChild>
                            <Link href="/auth">Login</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild>
                            <Link href="/auth">Get Started</Link>
                        </Button>
                      </SheetClose>
                  </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
