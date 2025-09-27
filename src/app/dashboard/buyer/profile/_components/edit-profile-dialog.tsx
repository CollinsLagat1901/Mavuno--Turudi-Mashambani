
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase-config';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Pencil } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  businessName: z.string().optional(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  preferredCrops: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
    userData: any;
    onProfileUpdate: (data: Partial<ProfileFormValues>) => void;
}

export default function EditProfileDialog({ userData, onProfileUpdate }: EditProfileDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
        fullName: '',
        businessName: '',
        phone: '',
        preferredCrops: '',
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        fullName: userData.name || '',
        businessName: userData.companyInfo?.name || '',
        phone: userData.phone || '',
        preferredCrops: (userData.sourcingPreferences?.preferredCrops || []).join(', '),
      });
    }
  }, [userData, form]);


  const handleSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("You must be logged in to edit your profile.");
        }

        const userRef = doc(db, 'users', user.uid);

        await setDoc(userRef, {
            name: values.fullName,
            phone: values.phone,
            companyInfo: {
                name: values.businessName
            },
            sourcingPreferences: {
                preferredCrops: values.preferredCrops?.split(',').map(s => s.trim()) || []
            }
        }, { merge: true });

        toast({
            title: "Profile Updated!",
            description: "Your information has been saved successfully.",
        });

        onProfileUpdate(values);
        setIsOpen(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pencil className="mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Buyer Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Collins Buyer" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Business Name (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Fresh Produce Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 0700111222" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="preferredCrops"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Sourcing Preferences</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Avocado, Mangoes, French Beans" {...field} />
                        </FormControl>
                         <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
