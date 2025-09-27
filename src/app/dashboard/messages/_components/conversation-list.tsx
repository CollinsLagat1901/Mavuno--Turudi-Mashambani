
'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase-config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface User {
    id: string;
    name?: string;
    // other user fields
}

interface Conversation {
    id: string;
    participants: string[];
    lastUpdated: any;
    otherUser: User | null;
    lastMessage: string;
}

export default function ConversationList() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.currentUser;
    const searchParams = useSearchParams();
    const activeChatId = searchParams.get('chatId');

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, 'chats'),
            where('participants', 'array-contains', currentUser.uid),
            orderBy('lastUpdated', 'desc')
        );

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const convos: any[] = [];
            const userPromises: Promise<any>[] = [];

            querySnapshot.forEach(doc => {
                const data = doc.data();
                const otherUserId = data.participants.find((p: string) => p !== currentUser.uid);

                if (otherUserId) {
                    const userPromise = getDoc(doc(db, 'users', otherUserId)).then(userDoc => {
                        return {
                            id: doc.id,
                            ...data,
                            otherUser: { id: userDoc.id, ...userDoc.data() },
                            lastMessage: data.messages?.slice(-1)[0]?.text || "No messages yet"
                        };
                    });
                    userPromises.push(userPromise);
                }
            });
            
            const resolvedConversations = await Promise.all(userPromises);
            setConversations(resolvedConversations);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    if (loading) {
        return (
             <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                   {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-3 w-[100px]" />
                            </div>
                        </div>
                   ))}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <h2 className="text-xl font-bold">Messages</h2>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-160px)]">
                    {conversations.length === 0 ? (
                        <p className="p-4 text-center text-muted-foreground">No conversations yet.</p>
                    ) : (
                        conversations.map(convo => (
                             <Link key={convo.id} href={`/dashboard/messages?chatId=${convo.id}`} className="block">
                                <div className={cn(
                                    "flex items-center gap-4 p-3 hover:bg-muted/50 cursor-pointer border-b",
                                    activeChatId === convo.id && 'bg-muted'
                                    )}>
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback>{convo.otherUser?.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 truncate">
                                        <p className="font-semibold">{convo.otherUser?.name || 'User'}</p>
                                        <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {convo.lastUpdated && formatDistanceToNow(convo.lastUpdated.toDate(), { addSuffix: true })}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
