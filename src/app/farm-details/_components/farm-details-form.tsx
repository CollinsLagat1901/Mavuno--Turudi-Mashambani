'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase-config';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin } from 'lucide-react';
import MapPicker from './map-picker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { kenyanCounties } from '@/lib/kenyan-counties';


const farmDetailsSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'A valid phone number is required'),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Expert']),

  farmName: z.string().min(2, 'Farm name must be at least 2 characters'),
  farmSize: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Farm size must be a positive number')
  ),
  farmingType: z.enum(['Crop Farming', 'Livestock', 'Mixed']),
  county: z.string().min(1, 'Please select your county from the map'),
  subCounty: z.string().min(2, 'Sub-county is required'),
  latitude: z.number(),
  longitude: z.number(),
  soilType: z.enum(['Sandy', 'Loamy', 'Clay', 'Unknown']).optional(),
  irrigationAccess: z.boolean().default(false),
  waterSource: z.enum(['River', 'Borehole', 'Rain-fed', 'Other']),
  
  mainCrops: z.string().optional(),
  farmingMethod: z.enum(['Organic', 'Conventional', 'Mixed']),

  mainGoal: z.enum(['Profit Maximization', 'Sustainability', 'Food Security', 'Export']),
  challenges: z.string().optional(),
});

type FarmDetailsValues = z.infer<typeof farmDetailsSchema>;

export function FarmDetailsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FarmDetailsValues>({
    resolver: zodResolver(farmDetailsSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      experienceLevel: 'Beginner',
      farmName: '',
      farmSize: 0,
      farmingType: 'Crop Farming',
      county: '',
      subCounty: '',
      latitude: -0.3031,
      longitude: 36.0800,
      soilType: 'Loamy',
      irrigationAccess: false,
      waterSource: 'Rain-fed',
      mainCrops: '',
      farmingMethod: 'Organic',
      mainGoal: 'Profit Maximization',
      challenges: '',
    },
  });

  const handleSubmit = async (values: FarmDetailsValues) => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;

      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Not Authenticated',
          description: 'You must be logged in to save farm details.',
        });
        router.push('/auth');
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      
      const mainCropsList = values.mainCrops?.split(',').map(s => s.trim()).filter(Boolean) || [];
      const cropsData = mainCropsList.reduce((acc, cropName, index) => {
        acc[`crop${index + 1}`] = { 
            name: cropName,
            stage: 'Planting', // default value
            season: 'Long Rains', // default value
            method: values.farmingMethod,
            expectedYield: 0 // default value
        };
        return acc;
      }, {} as any);

      await setDoc(
        userRef,
        {
          name: values.fullName,
          phone: values.phone,
          experience: values.experienceLevel,
          goal: values.mainGoal,
          challenges: values.challenges?.split(',').map(s => s.trim()).filter(Boolean),
          farms: {
            farm1: {
              name: values.farmName,
              size: values.farmSize,
              farmingType: values.farmingType,
              location: {
                county: values.county,
                subCounty: values.subCounty,
                gps: [values.latitude, values.longitude],
              },
              soilType: values.soilType,
              irrigation: values.irrigationAccess ? 'Yes' : 'No',
              waterSource: values.waterSource,
              crops: cropsData
            }
          },
          preferences: { // Adding default preferences
              notifications: ["In-App"],
              ai_focus: ["Crop selection", "Market insights"]
          },
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      toast({
        title: 'Farmer Details Saved!',
        description: 'Your farm information has been successfully updated.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Accordion type="multiple" defaultValue={['personal', 'farm']} className="w-full">
            {/* Personal Information */}
            <AccordionItem value="personal">
                <AccordionTrigger className="text-lg font-semibold text-primary">Personal Information</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                     <FormField
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Farming Experience</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner (Less than 2 years)</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate (2-5 years)</SelectItem>
                                        <SelectItem value="Expert">Expert (More than 5 years)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                </AccordionContent>
            </AccordionItem>

            {/* Farm Information */}
            <AccordionItem value="farm">
                <AccordionTrigger className="text-lg font-semibold text-primary">Farm Information</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                     <FormField
                        control={form.control}
                        name="farmName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Farm Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Green Acres" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="farmSize"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Farm Size (acres)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 5" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="farmingType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Farming Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="Crop Farming">Crop Farming</SelectItem>
                                            <SelectItem value="Livestock">Livestock</SelectItem>
                                            <SelectItem value="Mixed">Mixed Farming</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                    <div className="space-y-2">
                        <FormLabel>Farm Location</FormLabel>
                        <p className="text-sm text-muted-foreground">
                            Search for your farm's location or drag the pin to the exact spot.
                        </p>
                        <Controller
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                            <MapPicker
                                onLocationChange={(lat, lng, county, subCounty) => {
                                field.onChange(lat);
                                form.setValue('longitude', lng);
                                form.setValue('county', county);
                                form.setValue('subCounty', subCounty || '');
                                }}
                            />
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <FormField
                                    control={form.control}
                                    name="county"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>County</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Selected from map" {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="subCounty"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Sub-county</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Lanet" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="soilType"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Soil Type (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="What's your soil like?" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                    <SelectItem value="Sandy">Sandy</SelectItem>
                                    <SelectItem value="Loamy">Loamy</SelectItem>
                                    <SelectItem value="Clay">Clay</SelectItem>
                                    <SelectItem value="Unknown">I don't know</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="waterSource"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Primary Water Source</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Rain-fed">Rain-fed</SelectItem>
                                        <SelectItem value="Borehole">Borehole</SelectItem>
                                        <SelectItem value="River">River</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                     <FormField
                        control={form.control}
                        name="irrigationAccess"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Do you have access to irrigation?</FormLabel>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                </AccordionContent>
            </AccordionItem>
            
            {/* Crop Information */}
            <AccordionItem value="crop">
                <AccordionTrigger className="text-lg font-semibold text-primary">Crop & Farming Methods</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                     <FormField
                        control={form.control}
                        name="mainCrops"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Main Crops Grown</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Maize, Beans, Tomatoes" {...field} />
                                </FormControl>
                                <FormDescription>Separate multiple crops with a comma.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="farmingMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Farming Method</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Conventional">Conventional</SelectItem>
                                        <SelectItem value="Organic">Organic</SelectItem>
                                        <SelectItem value="Mixed">Mixed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                </AccordionContent>
            </AccordionItem>

             {/* Goals & Challenges */}
            <AccordionItem value="goals">
                <AccordionTrigger className="text-lg font-semibold text-primary">Goals & Challenges</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                     <FormField
                        control={form.control}
                        name="mainGoal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What is your main farming goal?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Profit Maximization">Profit Maximization</SelectItem>
                                        <SelectItem value="Food Security">Food Security for my family</SelectItem>
                                        <SelectItem value="Sustainability">Sustainable &amp; Organic Farming</SelectItem>
                                        <SelectItem value="Export">Growing for Export</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="challenges"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What are your biggest challenges?</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Pests, Low Prices, Weather" {...field} />
                                </FormControl>
                                 <FormDescription>Separate multiple challenges with a comma.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                </AccordionContent>
            </AccordionItem>

        </Accordion>
        
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push('/dashboard')}
            disabled={isLoading}
          >
            Skip for now
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save & Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
