
'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CornerDownLeft, Loader2, Bot, User as UserIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { onSnapshot, doc, setDoc, updateDoc, arrayUnion, serverTimestamp, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/lib/firebase-config';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
}

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatFormValues = z.infer<typeof chatSchema>;

export default function ChatWindow() {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipient');
  const listingId = searchParams.get('listing');
  const chatId = searchParams.get('chatId');

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(chatId);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [recipient, setRecipient] = useState<any>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentUser = auth.currentUser;


  useEffect(() => {
    const findOrCreateConversation = async () => {
        if (!currentUser || (!recipientId && !chatId)) return;
        setIsLoading(true);

        // If we have a chatId, fetch that conversation
        if (chatId) {
            const chatRef = doc(db, 'chats', chatId);
            const chatSnap = await getDoc(chatRef);
            if (chatSnap.exists()) {
                const chatData = chatSnap.data();
                const otherParticipantId = chatData.participants.find((p: string) => p !== currentUser.uid);
                const userRef = doc(db, 'users', otherParticipantId);
                const userSnap = await getDoc(userRef);
                setRecipient(userSnap.data());
                setConversationId(chatId);
            }
            setIsLoading(false);
            return;
        }
        
        // If we have recipientId, find existing conversation
        if(recipientId) {
            const userRef = doc(db, 'users', recipientId);
            const userSnap = await getDoc(userRef);
            setRecipient(userSnap.data());

            const q = query(
                collection(db, 'chats'),
                where('participants', 'array-contains', currentUser.uid)
            );
            const querySnapshot = await getDocs(q);
            let existingChat: any = null;
            querySnapshot.forEach(doc => {
                const data = doc.data();
                if(data.participants.includes(recipientId)) {
                    existingChat = { id: doc.id, ...data };
                }
            });

            if (existingChat) {
                setConversationId(existingChat.id);
            } else {
                // Or create a new one if it doesn't exist
                const newChatRef = await addDoc(collection(db, 'chats'), {
                    participants: [currentUser.uid, recipientId],
                    listingId: listingId || 'general',
                    createdAt: serverTimestamp(),
                    lastUpdated: serverTimestamp(),
                    messages: []
                });
                setConversationId(newChatRef.id);
            }
        }
        setIsLoading(false);
    };

    findOrCreateConversation();

  }, [recipientId, chatId, currentUser, listingId]);


  useEffect(() => {
    if (!conversationId) return;

    const unsub = onSnapshot(doc(db, 'chats', conversationId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMessages(data.messages || []);
      }
    });

    return () => unsub();
  }, [conversationId]);


  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'auto' });
    }
  }, [messages]);


  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  });

  const handleSendMessage: SubmitHandler<ChatFormValues> = async (data) => {
    if (!currentUser || !conversationId) return;

    setIsSending(true);
    form.reset();
    
    const messageData = {
      id: uuidv4(),
      senderId: currentUser.uid,
      text: data.message,
      timestamp: serverTimestamp(),
    };

    try {
      const chatRef = doc(db, 'chats', conversationId);
      await updateDoc(chatRef, {
        messages: arrayUnion(messageData),
        lastUpdated: serverTimestamp(),
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error sending message',
        description: error.message,
      });
    } finally {
      setIsSending(false);
    }
  };
  
  if (isLoading) {
      return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
        </Card>
      )
  }

  if (!recipient && !chatId) {
      return (
           <Card className="h-full flex items-center justify-center">
               <CardContent className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Select a conversation</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Your messages with farmers and buyers will appear here.
                    </p>
               </CardContent>
           </Card>
      )
  }


  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
         <Avatar>
            <AvatarFallback>{recipient?.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
        <div>
            <CardTitle className="text-base">{recipient?.name || 'User'}</CardTitle>
            <CardDescription className="text-xs">
                {recipient?.role === 'farmer' ? 'Farmer' : 'Buyer'} | Related to: {listingId}
            </CardDescription>
        </div>
      </CardHeader>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
            {messages.map((message, index) => (
                <div
                    key={message.id || index}
                    className={cn(
                    'flex items-end gap-2',
                    message.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'
                    )}
                >
                    {message.senderId !== currentUser?.uid && (
                        <Avatar className="h-8 w-8">
                             <AvatarFallback>{recipient?.name?.substring(0,1) || 'R'}</AvatarFallback>
                        </Avatar>
                    )}
                    <div className={cn(
                        "rounded-lg px-3 py-2 max-w-[70%] text-sm",
                        message.senderId === currentUser?.uid
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                    >
                        <p>{message.text}</p>
                    </div>
                     {message.senderId === currentUser?.uid && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>Me</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
             {isSending && (
                <div className="flex items-end gap-2 justify-end">
                    <div className="rounded-lg px-3 py-2 max-w-[70%] bg-primary/50 text-primary-foreground text-sm">
                        <p>Sending...</p>
                    </div>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>Me</AvatarFallback>
                    </Avatar>
                </div>
             )}
        </div>
      </ScrollArea>
      <CardFooter className="p-2 border-t">
        <form
            onSubmit={form.handleSubmit(handleSendMessage)}
            className="flex items-center gap-2 w-full"
            >
            <Textarea
                placeholder="Type your message..."
                className="flex-1 resize-none"
                rows={1}
                {...form.register('message')}
                disabled={isSending}
                autoComplete="off"
                 onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(handleSendMessage)();
                    }
                }}
            />
            <Button type="submit" size="icon" disabled={isSending}>
                <CornerDownLeft className="h-4 w-4" />
            </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
