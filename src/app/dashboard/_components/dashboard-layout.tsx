'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  LineChart,
  LogOut,
  Settings,
  Sheet as SheetIcon,
  ShoppingBag,
  User,
  BookUser,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MavunoLogo from '@/components/icons/mavuno-logo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { getFirebaseAuth } from '@/lib/firebase-config';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '#', label: 'Insights', icon: LineChart },
  { href: '#', label: 'Crop Insights', icon: SheetIcon },
  { href: '/farm-details', label: 'Farm Details', icon: BookUser },
  { href: '#', label: 'Market', icon: ShoppingBag },
  { href: '#', label: 'Profile', icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const auth = await getFirebaseAuth();
      await signOut(auth);
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
      router.push('/auth');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign Out Failed',
        description: error.message,
      });
    }
  };
  
  const UserNav = () => (
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@shadcn" />
              <AvatarFallback>JH</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Jembe Haraka</p>
              <p className="text-xs leading-none text-muted-foreground">
                jembe@mavuno.co.ke
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
           <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );

  return (
    <SidebarProvider>
        <Sidebar collapsible="icon" side="left" variant="sidebar">
          <SidebarHeader>
            <MavunoLogo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    tooltip={link.label}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-8">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden"/>
                <h1 className="text-xl font-semibold md:text-2xl whitespace-nowrap">Dashboard</h1>
            </div>
             <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground hidden md:block">
                  <span className="font-semibold text-foreground">Powered by Entity AI</span>
                </p>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <UserNav />
              </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>

        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          Mavuno © {new Date().getFullYear()} | Powered by Entity AI
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
