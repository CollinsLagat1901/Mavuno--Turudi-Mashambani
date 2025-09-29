
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CornerDownLeft, Loader2, Mic, Paperclip, User, Bot, MapPin } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

import { chat, ChatInput, ChatOutput } from '@/ai/flows/assistant-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Part } from 'genkit';


const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatFormValues = z.infer<typeof chatSchema>;

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  imageUrl?: string;
  imageHint?: string;
}

const initialMessages: Message[] = [
    {
        id: 'init-1',
        role: 'model',
        content: "Hello! I'm Mavuno, your personal AI farming assistant. How can I help you today? You can even send me a picture of a crop you're having trouble with.",
    },
    {
        id: 'mock-user-1',
        role: 'user',
        content: "Hi Mavuno, what's wrong with my maize plant? It has these strange yellow streaks.",
        imageUrl: "https://nowqwttrqtklrxgjgxid.supabase.co/storage/v1/object/sign/mavuno/photo/Maize%20Lethal%20Necrosis%20(MLN).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ODJlZjdiMC00NWVmLTQ3YzgtOTE4Ni0wMWUyNmM2ZGNiYTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtYXZ1bm8vcGhvdG8vTWFpemUgTGV0aGFsIE5lY3Jvc2lzIChNTE4pLmpwZyIsImlhdCI6MTc1OTE1MzQ0NCwiZXhwIjoxNzYxNzQ1NDQ0fQ.rKBIOjGYy8zIBmuJh8xQoTy0Gpg0rCQJSkBfclJ5xo0",
        imageHint: 'maize disease',
    },
    {
        id: 'mock-model-1',
        role: 'model',
        content: `Based on the image, this looks like **Maize Lethal Necrosis (MLN)**. This is a serious viral disease.

**Treatment:**
1.  Remove and burn all infected plants immediately to prevent it from spreading.
2.  Practice crop rotation and avoid planting maize in the same field for at least two seasons.
3.  For control, you can spray with a combination of an insecticide like 'Lambda-cyhalothrin' to control the insect vectors (aphids and thrips) and a foliar fertilizer to boost plant health.

**Nearest Pesticide Shop:**
📍 **Nakuru Agrovet Center**
George Morara Road, Nakuru
(5.2 km from your farm)`
    }
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = { id: uuidv4(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();
    
    // Prepare history for the AI flow
    const historyForAI: {role: 'user' | 'model', content: string}[] = messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));


    try {
      const response = await chat({
        history: historyForAI,
        message: input,
      });

      const aiMessage: Message = { id: uuidv4(), role: 'model', content: response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to get a response from the assistant.',
      });
      // Remove the user's message if the API call fails
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmit: SubmitHandler<ChatFormValues> = (data) => {
     handleSendMessage(data.message);
  };

  const starterPrompts = [
    "Best crop for my farm?",
    "Today's weather forecast",
    "Market prices for maize in Nakuru",
    "How do I test my soil pH?",
  ];


  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex items-start gap-4',
              message.role === 'user' && 'justify-end'
            )}
          >
            {message.role === 'model' && (
               <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-6 w-6 text-primary" />
                </div>
            )}
            <div className={cn(
                "flex-1 space-y-2 overflow-hidden px-1",
                 message.role === 'user' && 'flex-initial'
                )}>
                <div
                    className={cn(
                    'rounded-xl p-4',
                    message.role === 'user'
                        ? 'bg-secondary/20'
                        : 'bg-muted'
                    )}
                >
                    {message.imageUrl && (
                        <div className="relative h-48 w-full mb-2 rounded-lg overflow-hidden">
                            <Image src={message.imageUrl} alt={message.imageHint || 'User uploaded image'} fill className="object-cover" />
                        </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
            </div>
             {message.role === 'user' && (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                    <User className="h-6 w-6 text-secondary-foreground" />
                </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
            <div className="flex-1 space-y-2 overflow-hidden px-1">
                <div className="rounded-xl bg-muted p-4">
                    <p className="text-sm font-medium">Mavuno is thinking...</p>
                </div>
            </div>
          </div>
        )}
         <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-background p-4">
         {messages.length <= 3 && <div className="mb-4 grid grid-cols-2 gap-2">
              {starterPrompts.map(prompt => (
                <Button key={prompt} variant="outline" size="sm" className="h-auto py-2 text-wrap" onClick={() => handleSendMessage(prompt)}>
                  {prompt}
                </Button>
              ))}
        </div>}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Ask Mavuno anything..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            {...form.register('message')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
              }
            }}
            disabled={isLoading}
          />
          <div className="flex items-center p-3 pt-0">
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button type="button" variant="ghost" size="icon" disabled={isLoading}>
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button type="button" variant="ghost" size="icon" disabled={isLoading}>
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={isLoading}>
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

    
