
'use client';
import { ReactNode } from 'react';
import { User } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';


interface UserData {
    name?: string;
    email?: string;
}
interface ProfileHeaderProps { 
    children?: ReactNode;
    user: User | null;
    userData: UserData | null;
    loading: boolean;
}

export default function ProfileHeader({ children, user, userData, loading }: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {loading ? (
            <Skeleton className="h-16 w-16 rounded-full" />
        ) : (
            <Avatar className="h-16 w-16">
                <AvatarImage src={user?.photoURL || `https://avatar.vercel.sh/${userData?.name}.png`} alt={userData?.name || 'User'} />
                <AvatarFallback>{userData?.name ? userData.name.substring(0, 2).toUpperCase() : 'BU'}</AvatarFallback>
            </Avatar>
        )}
        <div className="space-y-1">
            {loading ? (
                <>
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-5 w-48" />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold tracking-tight text-primary">{userData?.name || 'My Profile'}</h1>
                    <p className="text-muted-foreground">
                        {user?.email}
                    </p>
                </>
            )}
        </div>
      </div>
      {children}
    </div>
  );
}
