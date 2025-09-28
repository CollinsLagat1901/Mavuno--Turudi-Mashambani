
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
  MessageCircle,
  MessageSquare,
  Tractor,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, limit, doc, updateDoc } from 'firebase/firestore';


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
  DropdownMenuGroup,
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
import { auth, db } from '@/lib/firebase-config';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const navLinks = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/assistant', label: 'Mavuno Assistant', icon: MessageCircle },
  { href: '/dashboard/insights', label: 'Insights', icon: LineChart },
  { href: '/dashboard/market', label: 'Market', icon: ShoppingBag },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/farm-details', label: 'Farmer Details', icon: BookUser },
  { href: '/dashboard/transport', label: 'Transport', icon: Tractor },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

interface Notification {
    id: string;
    title: string;
    message: string;
    status: 'read' | 'unread';
    type: string;
    createdAt: any;
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);


   useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => n.status === 'unread').length);
    });

    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    const notifRef = doc(db, 'notifications', id);
    await updateDoc(notifRef, { status: 'read' });
  };
  
  const handleOpenNotifications = (open: boolean) => {
      if(open && unreadCount > 0){
          notifications.forEach(n => {
              if(n.status === 'unread') handleMarkAsRead(n.id);
          });
      }
  }


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
                    isActive={pathname.startsWith(link.href) && (link.href !== '/dashboard' || pathname === '/dashboard')}
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
                <DropdownMenu onOpenChange={handleOpenNotifications}>
                    <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon" className="rounded-full relative">
                          <Bell className="h-5 w-5" />
                          {unreadCount > 0 && (
                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{unreadCount}</Badge>
                          )}
                          <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          {notifications.length > 0 ? notifications.slice(0, 5).map(n => (
                            <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 whitespace-normal">
                                <p className="font-semibold">{n.title}</p>
                                <p className="text-xs text-muted-foreground">{n.message}</p>
                            </DropdownMenuItem>
                          )) : (
                            <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                          )}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center">
                            View All
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
