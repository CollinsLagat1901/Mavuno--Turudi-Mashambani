
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { auth, db } from '@/lib/firebase-config';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Landmark, Tractor, ShoppingCart, User as UserIcon } from 'lucide-react';
import MavunoLogo from '@/components/icons/mavuno-logo';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const roles = [
    {
        name: 'farmer',
        label: 'Farmer',
        icon: UserIcon,
        description: 'Get crop insights, weather data, and market prices.',
        isAvailable: true,
    },
    {
        name: 'buyer',
        label: 'Buyer',
        icon: ShoppingCart,
        description: 'Browse produce, contact farmers, and post purchase requests.',
        isAvailable: true,
    },
    {
        name: 'transporter',
        label: 'Transporter',
        icon: Tractor,
        description: 'Connect with farmers and buyers needing logistics.',
        isAvailable: true,
    },
    {
        name: 'government',
        label: 'Admin / Govt. Officer',
        icon: Landmark,
        description: 'Access regional agricultural data and reports.',
        isAvailable: false,
    },
] as const;


const signUpSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['farmer', 'buyer', 'transporter', 'government'], { required_error: 'You must select a role.'}),
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
    },
  });

  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSuccessfulAuth = async (user: User) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    let userData = userDoc.exists() ? userDoc.data() : null;

    // Handle new users (e.g., first time Google sign-in)
    if (!userData || !userData.role) {
        const defaultRole = 'farmer'; // Default new users to farmer
        await saveUserToFirestore(user, {
            fullName: user.displayName,
            email: user.email,
            role: defaultRole,
        });
        userData = { ...(userData || {}), role: defaultRole };
    }
    
    switch (userData.role) {
        case 'farmer':
            // If farmer has not filled in their farm details, redirect them
            if (!userData.farms || Object.keys(userData.farms).length === 0) {
                router.push('/farm-details');
            } else {
                router.push('/dashboard');
            }
            break;
        case 'buyer':
            router.push('/dashboard/buyer');
            break;
        case 'transporter':
             router.push('/dashboard/transporter');
            break;
        case 'government':
             router.push('/dashboard/settings');
            break;
        default:
            // Fallback for any other case is to send to farm details setup
            toast({
                title: 'Complete Your Profile',
                description: 'Please complete your profile to continue.',
            });
            router.push('/farm-details');
            break;
    }
  }

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
        description: 'Redirecting you to the next step...',
      });
      await handleSuccessfulAuth(user);

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

  const saveUserToFirestore = async (user: User, data: Partial<SignUpValues>) => {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    const dataToSave = {
      uid: user.uid,
      name: data.fullName || user.displayName || 'Anonymous',
      email: data.email || user.email,
      phone: data.phone || user.phoneNumber || '',
      role: data.role || 'farmer', // Default to farmer if not specified
      updatedAt: serverTimestamp(),
      ...(userDoc.exists() ? {} : { createdAt: serverTimestamp() }), // Only set createdAt on new document
    };
    
    await setDoc(userRef, dataToSave, { merge: true });
  };

  const handleSignIn = async (values: SignInValues) => {
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Signed In!',
        description: 'Welcome back to Mavuno.',
      });
      await handleSuccessfulAuth(user);
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      toast({
        title: 'Signed In!',
        description: `Welcome ${user.displayName || 'to Mavuno'}!`,
      });
      await handleSuccessfulAuth(user);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const GoogleSignInButton = () => (
    <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
        {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 120.5 109.8 8 244 8c66.8 0 126 23.4 172.9 61.9l-69.5 69.5c-24.2-23.4-58.2-37.5-93.4-37.5-73.6 0-133.5 60.3-133.5 134.5s59.9 134.5 133.5 134.5c76.9 0 119.5-53.5 123.3-81.8H244v-91.2h244z"></path>
            </svg>
        )}
      Sign in with Google
    </Button>
  )

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">Create Your Mavuno Account</h3>
          <p className="text-sm text-muted-foreground">Join Mavuno and connect with Kenya’s smart agriculture network.</p>
        </div>
        <div className="space-y-4">
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
                    name="role"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Select Your Role</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                            {roles.map(role => (
                                <FormItem key={role.name}>
                                    <FormControl>
                                        <RadioGroupItem value={role.name} id={role.name} className="sr-only" disabled={!role.isAvailable}/>
                                    </FormControl>
                                    <FormLabel htmlFor={role.name} className={cn("cursor-pointer", !role.isAvailable && "cursor-not-allowed opacity-50")}>
                                        <Card className={cn(
                                            "border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground",
                                            field.value === role.name && "border-primary"
                                        )}>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                                                <CardTitle className="text-sm font-medium">{role.label}</CardTitle>
                                                <role.icon className="h-5 w-5 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-xs text-muted-foreground">{role.description}</p>
                                                {!role.isAvailable && <Badge variant="secondary" className="mt-2">Coming Soon</Badge>}
                                            </CardContent>
                                        </Card>
                                    </FormLabel>
                                </FormItem>
                            ))}
                            </RadioGroup>
                        </FormControl>
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
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
            <GoogleSignInButton />
        </div>
      </TabsContent>
      <TabsContent value="sign-in">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">Welcome Back to Mavuno</h3>
          <p className="text-sm text-muted-foreground">Sign in to access your insights.</p>
        </div>
        <div className="space-y-4">
            <GoogleSignInButton />
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
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
        </div>
      </TabsContent>
    </Tabs>
  );
}

    

    
