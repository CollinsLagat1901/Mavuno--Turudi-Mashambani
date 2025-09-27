
'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  FormDescription,
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
import { Switch } from '@/components/ui/switch';


const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'A valid phone number is required'),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Expert']),

  farmName: z.string().min(2, 'Farm name must be at least 2 characters'),
  farmSize: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Farm size must be a positive number')
  ),
  farmingType: z.enum(['Crop Farming', 'Livestock', 'Mixed']),
  subCounty: z.string().min(2, 'Sub-county is required'),
  soilType: z.enum(['Sandy', 'Loamy', 'Clay', 'Unknown']).optional(),
  irrigationAccess: z.boolean().default(false),
  waterSource: z.enum(['River', 'Borehole', 'Rain-fed', 'Other']),
  
  mainCrops: z.string().optional(),
  farmingMethod: z.enum(['Organic', 'Conventional', 'Mixed']),

  mainGoal: z.enum(['Profit Maximization', 'Sustainability', 'Food Security', 'Export']),
  challenges: z.string().optional(),
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
        experienceLevel: 'Beginner',
        farmName: '',
        farmSize: 0,
        farmingType: 'Crop Farming',
        subCounty: '',
        soilType: 'Unknown',
        irrigationAccess: false,
        waterSource: 'Rain-fed',
        mainCrops: '',
        farmingMethod: 'Conventional',
        mainGoal: 'Profit Maximization',
        challenges: '',
    },
  });

  useEffect(() => {
    if (userData) {
      const farm = userData.farms?.farm1;
      const crops = farm?.crops ? Object.values(farm.crops).map((c: any) => c.name).join(', ') : '';
      
      form.reset({
        fullName: userData.name || '',
        phone: userData.phone || '',
        experienceLevel: userData.experience || 'Beginner',
        farmName: farm?.name || '',
        farmSize: farm?.size || 0,
        farmingType: farm?.farmingType || 'Crop Farming',
        subCounty: farm?.location?.subCounty || '',
        soilType: farm?.soilType || 'Unknown',
        irrigationAccess: farm?.irrigation === 'Yes',
        waterSource: farm?.waterSource || 'Rain-fed',
        mainCrops: crops,
        farmingMethod: (farm?.crops && Object.values(farm.crops).length > 0) ? (Object.values(farm.crops)[0] as any).method : 'Conventional',
        mainGoal: userData.goal || 'Profit Maximization',
        challenges: (userData.challenges || []).join(', '),
      });
    }
  }, [userData, form, isOpen]);


  const handleSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("You must be logged in to edit your profile.");

        const userRef = doc(db, 'users', user.uid);
        
        const mainCropsList = values.mainCrops?.split(',').map(s => s.trim()).filter(Boolean) || [];
        const cropsData = mainCropsList.reduce((acc, cropName, index) => {
            acc[`crop${index + 1}`] = { 
                name: cropName,
                method: values.farmingMethod,
                season: 'Long Rains', // default
                stage: 'Planting', // default
                expectedYield: '0 bags' // default
            };
            return acc;
        }, {} as any);

        const dataToSave = {
            name: values.fullName,
            phone: values.phone,
            experience: values.experienceLevel,
            goal: values.mainGoal,
            challenges: values.challenges?.split(',').map(s => s.trim()).filter(Boolean),
            'farms.farm1.name': values.farmName,
            'farms.farm1.size': values.farmSize,
            'farms.farm1.farmingType': values.farmingType,
            'farms.farm1.location.subCounty': values.subCounty,
            'farms.farm1.soilType': values.soilType,
            'farms.farm1.irrigation': values.irrigationAccess ? 'Yes' : 'No',
            'farms.farm1.waterSource': values.waterSource,
            'farms.farm1.crops': cropsData,
        };
        
        // Firestore doesn't allow dot notation directly in setDoc with merge:true for nested objects in this way.
        // We need to update the fields manually.
        const updateData = {
          name: values.fullName,
          phone: values.phone,
          experience: values.experienceLevel,
          goal: values.mainGoal,
          challenges: values.challenges?.split(',').map(s => s.trim()).filter(Boolean),
          farms: {
            farm1: {
              ...userData.farms?.farm1, // preserve existing fields like gps
              name: values.farmName,
              size: values.farmSize,
              farmingType: values.farmingType,
              location: {
                ...userData.farms?.farm1?.location,
                subCounty: values.subCounty,
              },
              soilType: values.soilType,
              irrigation: values.irrigationAccess ? 'Yes' : 'No',
              waterSource: values.waterSource,
              crops: cropsData,
            },
          }
        };


        await setDoc(userRef, updateData, { merge: true });

        toast({
            title: "Profile Updated!",
            description: "Your information has been saved successfully.",
        });

        onProfileUpdate(updateData);
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
          <DialogTitle>Edit Farmer Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <Accordion type="multiple" defaultValue={['personal', 'farm', 'crop', 'goals']} className="w-full">
                    {/* Personal Information */}
                    <AccordionItem value="personal">
                        <AccordionTrigger className="text-base font-semibold">Personal Information</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                            <FormField name="fullName" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField name="phone" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField name="experienceLevel" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Farming Experience</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>
                                    <SelectItem value="Beginner">Beginner (&lt; 2 years)</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate (2-5 years)</SelectItem>
                                    <SelectItem value="Expert">Expert (&gt; 5 years)</SelectItem>
                                </SelectContent></Select><FormMessage /></FormItem>
                            )} />
                        </AccordionContent>
                    </AccordionItem>

                    {/* Farm Information */}
                    <AccordionItem value="farm">
                        <AccordionTrigger className="text-base font-semibold">Farm Information</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                            <FormField name="farmName" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Farm Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField name="farmSize" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Farm Size (acres)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField name="farmingType" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Farming Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>
                                        <SelectItem value="Crop Farming">Crop Farming</SelectItem><SelectItem value="Livestock">Livestock</SelectItem><SelectItem value="Mixed">Mixed Farming</SelectItem>
                                    </SelectContent></Select><FormMessage /></FormItem>
                                )} />
                            </div>
                            <p className="text-sm font-medium">Location is set from the main farm details page.</p>
                             <FormField name="subCounty" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Sub-county</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField name="soilType" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Soil Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>
                                        <SelectItem value="Sandy">Sandy</SelectItem><SelectItem value="Loamy">Loamy</SelectItem><SelectItem value="Clay">Clay</SelectItem><SelectItem value="Unknown">I don't know</SelectItem>
                                    </SelectContent></Select><FormMessage /></FormItem>
                                )}/>
                                <FormField name="waterSource" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Water Source</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>
                                        <SelectItem value="Rain-fed">Rain-fed</SelectItem><SelectItem value="Borehole">Borehole</SelectItem><SelectItem value="River">River</SelectItem><SelectItem value="Other">Other</SelectItem>
                                    </SelectContent></Select><FormMessage /></FormItem>
                                )}/>
                            </div>
                             <FormField name="irrigationAccess" control={form.control} render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5"><FormLabel>Irrigation Access?</FormLabel></div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}/>
                        </AccordionContent>
                    </AccordionItem>
                    
                    {/* Crop Information */}
                    <AccordionItem value="crop">
                        <AccordionTrigger className="text-base font-semibold">Crops & Methods</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                             <FormField name="mainCrops" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Main Crops Grown</FormLabel><FormControl><Input placeholder="e.g., Maize, Beans" {...field} /></FormControl><FormDescription>Separate crops with a comma.</FormDescription><FormMessage /></FormItem>
                            )}/>
                            <FormField name="farmingMethod" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Farming Method</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>
                                    <SelectItem value="Conventional">Conventional</SelectItem><SelectItem value="Organic">Organic</SelectItem><SelectItem value="Mixed">Mixed</SelectItem>
                                </SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                        </AccordionContent>
                    </AccordionItem>

                     {/* Goals & Challenges */}
                    <AccordionItem value="goals">
                        <AccordionTrigger className="text-base font-semibold">Goals & Challenges</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                             <FormField name="mainGoal" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Main Goal</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>
                                    <SelectItem value="Profit Maximization">Profit Maximization</SelectItem>
                                    <SelectItem value="Sustainability">Sustainability</SelectItem>
                                    <SelectItem value="Food Security">Food Security</SelectItem>
                                    <SelectItem value="Export">Export</SelectItem>
                                </SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                            <FormField name="challenges" control={form.control} render={({ field }) => (
                                <FormItem><FormLabel>Biggest Challenges</FormLabel><FormControl><Input placeholder="e.g., Pests, Low Prices" {...field} /></FormControl><FormDescription>Separate with a comma.</FormDescription><FormMessage /></FormItem>
                            )}/>
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

    