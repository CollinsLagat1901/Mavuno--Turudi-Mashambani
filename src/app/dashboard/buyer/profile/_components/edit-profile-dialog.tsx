
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Pencil } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const profileSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  kraPin: z.string().optional(),

  // Company Info
  businessName: z.string().optional(),
  companyLocation: z.string().optional(),
  website: z.string().optional(),
  businessType: z.string().optional(),

  // Sourcing Preferences
  preferredCrops: z.string().optional(),
  targetRegions: z.string().optional(),
  qualityTier: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
    userData: any;
    onProfileUpdate: (data: any) => void;
}

export default function EditProfileDialog({ userData, onProfileUpdate }: EditProfileDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
        fullName: '',
        phone: '',
        kraPin: '',
        businessName: '',
        companyLocation: '',
        website: '',
        businessType: '',
        preferredCrops: '',
        targetRegions: '',
        qualityTier: '',
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        fullName: userData.name || '',
        phone: userData.phone || '',
        kraPin: userData.kraPin || '',
        businessName: userData.companyInfo?.name || '',
        companyLocation: userData.companyInfo?.location || '',
        website: userData.companyInfo?.website || '',
        businessType: userData.companyInfo?.type || '',
        preferredCrops: (userData.sourcingPreferences?.preferredCrops || []).join(', '),
        targetRegions: (userData.sourcingPreferences?.targetRegions || []).join(', '),
        qualityTier: userData.sourcingPreferences?.qualityTier || '',
      });
    }
  }, [userData, form, isOpen]);


  const handleSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("You must be logged in to edit your profile.");
        }

        const userRef = doc(db, 'users', user.uid);
        
        const dataToSave = {
            name: values.fullName,
            phone: values.phone,
            kraPin: values.kraPin,
            companyInfo: {
                name: values.businessName,
                location: values.companyLocation,
                website: values.website,
                type: values.businessType,
            },
            sourcingPreferences: {
                preferredCrops: values.preferredCrops?.split(',').map(s => s.trim()).filter(Boolean) || [],
                targetRegions: values.targetRegions?.split(',').map(s => s.trim()).filter(Boolean) || [],
                qualityTier: values.qualityTier,
            }
        };

        await setDoc(userRef, dataToSave, { merge: true });

        toast({
            title: "Profile Updated!",
            description: "Your information has been saved successfully.",
        });

        onProfileUpdate(dataToSave);
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Buyer Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <Accordion type="multiple" defaultValue={['personal', 'sourcing']} className="w-full">
                    <AccordionItem value="personal">
                        <AccordionTrigger>Personal & Company Info</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
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
                                name="kraPin"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>KRA PIN / Business Reg. No.</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., A001234567Z" {...field} />
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
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Fresh Produce Inc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="businessType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select business type" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Wholesaler">Wholesaler</SelectItem>
                                                <SelectItem value="Retailer">Retailer</SelectItem>
                                                <SelectItem value="Exporter">Exporter</SelectItem>
                                                <SelectItem value="Supermarket">Supermarket / Distributor</SelectItem>
                                                <SelectItem value="Institutional">Government / Institutional</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="companyLocation"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Company Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Nairobi, Kenya" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Website (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., https://mybusiness.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="sourcing">
                        <AccordionTrigger>Sourcing Preferences</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-2">
                             <FormField
                                control={form.control}
                                name="preferredCrops"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Preferred Crops</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Avocado, Mangoes, French Beans" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="targetRegions"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Target Sourcing Regions</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Nakuru, Kiambu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="qualityTier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preferred Quality Tier</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select quality standard" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Grade A">Grade A (Premium/Export)</SelectItem>
                                                <SelectItem value="Grade B">Grade B (Standard)</SelectItem>
                                                <SelectItem value="Any">Any</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <DialogFooter className="pt-4">
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
