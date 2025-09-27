
"use client";
import { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Part } from 'genkit';
import { usePathname } from 'next/navigation';

import { buyerChat } from '@/ai/flows/buyer-assistant-flow';
import { chat as farmerChat } from '@/ai/flows/assistant-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, CornerDownLeft, Loader2, MessageCircle, User, X } from 'lucide-react';


const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatFormValues = z.infer<typeof chatSchema>;

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}


export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const isFarmerFlow = pathname.includes('/dashboard') && !pathname.includes('/dashboard/buyer');
    const isBuyerFlow = pathname.includes('/dashboard/buyer');


    const form = useForm<ChatFormValues>({
        resolver: zodResolver(chatSchema),
        defaultValues: { message: '' },
    });

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage: SubmitHandler<ChatFormValues> = async (data) => {
        const input = data.message;
        if (!input.trim()) return;

        const userMessage: Message = { id: uuidv4(), role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        form.reset();

        const historyForAI: {role: 'user' | 'model', content: string}[] = messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        try {
            let response: string;
            if(isBuyerFlow){
                response = await buyerChat({ history: historyForAI, message: input });
            } else {
                // Default to farmer chat for landing pages and farmer dashboard
                response = await farmerChat({ history: historyForAI, message: input });
            }

            const aiMessage: Message = { id: uuidv4(), role: 'model', content: response };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Failed to get a response from the assistant.',
            });
            setMessages(prev => prev.slice(0, -1)); // Remove the user's message on error
        } finally {
            setIsLoading(false);
        }
    };
    
    // Hide on auth and farm-details pages
    if (['/auth', '/farm-details'].includes(pathname)) {
        return null;
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
                    size="icon"
                >
                   {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align="end"
                className="w-[90vw] max-w-sm p-0 rounded-xl shadow-2xl mr-4 mb-2"
                sideOffset={12}
            >
                <div className="flex flex-col h-[60vh]">
                     <header className="p-4 border-b text-center bg-muted/50 rounded-t-xl">
                        <h3 className="font-semibold text-primary">Mavuno Assistant</h3>
                        <p className="text-xs text-muted-foreground">Ready to help</p>
                    </header>
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                             {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                    'flex items-start gap-3',
                                    message.role === 'user' && 'justify-end'
                                    )}
                                >
                                    {message.role === 'model' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><Bot size={20} /></AvatarFallback>
                                    </Avatar>
                                    )}
                                    <div className={cn(
                                        "rounded-lg px-3 py-2 max-w-[80%]",
                                        message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                        )}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback><User size={20} /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback><Loader2 size={20} className="animate-spin" /></AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-lg px-3 py-2 bg-muted">
                                        <p className="text-sm">Mavuno is thinking...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="border-t p-2">
                        <form
                            onSubmit={form.handleSubmit(handleSendMessage)}
                            className="flex items-center gap-2"
                            >
                            <Input
                                placeholder="Ask anything..."
                                className="flex-1"
                                {...form.register('message')}
                                disabled={isLoading}
                                autoComplete="off"
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <CornerDownLeft className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
