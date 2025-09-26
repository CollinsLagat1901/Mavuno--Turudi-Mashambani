'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import { auth, db } from '@/lib/firebase-config';
import { kenyanCounties } from '@/lib/kenyan-counties';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const signUpSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  county: z.string().min(1, 'Please select your county'),
});

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type SignUpValues = z.infer<typeof signUpSchema>;
type SignInValues = z.infer<typeof signInSchema>;

export function AuthForm() {
  const [activeTab, setActiveTab] = useState('sign-up');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      county: '',
    },
  });

  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignUp = async (values: SignUpValues) => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await saveUserToFirestore(user, values);
      toast({
        title: 'Account Created!',
        description: 'You have been successfully signed up.',
      });
      router.push('/dashboard'); // Or any other protected route
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserToFirestore = async (user: User, data: SignUpValues) => {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      fullName: data.fullName,
      email: user.email,
      phone: data.phone,
      county: data.county,
      createdAt: new Date(),
    });
  };

  const handleSignIn = async (values: SignInValues) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Signed In!',
        description: 'Welcome back to Mavuno.',
      });
      router.push('/dashboard'); // Or any other protected route
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">Create Your Mavuno Account</h3>
          <p className="text-sm text-muted-foreground">Get personalized insights for your county.</p>
        </div>
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
            <FormField
              control={signUpForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jembe Haraka" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="jembe@mavuno.co.ke" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="0712345678" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your county" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kenyanCounties.map((county) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="sign-in">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">Welcome Back to Mavuno</h3>
          <p className="text-sm text-muted-foreground">Sign in to access your insights.</p>
        </div>
        <Form {...signInForm}>
          <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
            <FormField
              control={signInForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jembe@mavuno.co.ke" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button variant="link" size="sm" asChild className="p-0 h-auto">
                <Link href="#">Forgot Password?</Link>
              </Button>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
