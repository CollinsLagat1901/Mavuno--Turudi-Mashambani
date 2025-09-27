
'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  LineChart,
  LogOut,
  Settings,
  ShoppingBag,
  User as UserIcon,
  MessageCircle,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, User } from 'firebase/auth';

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
import { auth } from '@/lib/firebase-config';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: '/dashboard/buyer', label: 'Home', icon: Home },
  { href: '/dashboard/assistant', label: 'Mavuno Assistant', icon: MessageCircle },
  { href: '/dashboard/market', label: 'Market Analysis', icon: LineChart },
  { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
];

interface UserData {
    name?: string;
    email?: string;
}

interface BuyerDashboardLayoutProps {
  children: React.ReactNode;
  user: User | null;
  userData: UserData | null;
  loading: boolean;
}

export default function BuyerDashboardLayout({
  children,
  user,
  userData,
  loading
}: BuyerDashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
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
              <AvatarImage src={user?.photoURL || `https://avatar.vercel.sh/${userData?.name}.png`} alt={userData?.name || 'User'} />
              <AvatarFallback>{userData?.name ? userData.name.substring(0, 2).toUpperCase() : 'BU'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{loading ? 'Loading...' : userData?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {loading ? '' : user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
           <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
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
        <Sidebar collapsible="icon" side="left" variant="floating">
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
                <h1 className="text-xl font-semibold md:text-2xl whitespace-nowrap">Buyer Dashboard</h1>
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
