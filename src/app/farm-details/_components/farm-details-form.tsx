
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc, serverTimestamp, collection, addDoc, GeoPoint } from 'firebase/firestore';
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
import { Textarea } from '@/components/ui/textarea';


const farmDetailsSchema = z.object({
  soilType: z.enum(["Loam", "Clay", "Sandy", "Silt", "Peaty", "Chalky"]),
  farmSize: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Farm size must be a positive number')
  ),
  county: z.string().min(1, 'Please select your county from the map'),
  subCounty: z.string().min(2, 'Sub-county is required'),
  latitude: z.number(),
  longitude: z.number(),
  cropsPlanted: z.string().optional(),
  cropPreferences: z.string().optional(),
  irrigationAccess: z.boolean().default(false),
  lastSeasonYield: z.preprocess(
    (a) => (a ? parseFloat(z.string().parse(a)) : undefined),
    z.number().positive('Yield must be a positive number').optional()
  ),
  farmingChallenges: z.string().optional(),
});

type FarmDetailsValues = z.infer<typeof farmDetailsSchema>;

export function FarmDetailsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FarmDetailsValues>({
    resolver: zodResolver(farmDetailsSchema),
    defaultValues: {
      soilType: 'Loam',
      farmSize: 0,
      county: '',
      subCounty: '',
      latitude: -0.3031,
      longitude: 36.0800,
      cropsPlanted: '',
      cropPreferences: '',
      irrigationAccess: false,
      farmingChallenges: '',
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
          description: 'You must be logged in to submit farm data.',
        });
        router.push('/auth');
        return;
      }
      
      const submissionData = {
          userId: user.uid,
          soilType: values.soilType,
          landSize: values.farmSize,
          location: {
              county: values.county,
              subCounty: values.subCounty,
              geoPoint: new GeoPoint(values.latitude, values.longitude)
          },
          cropsPlanted: values.cropsPlanted?.split(',').map(s => s.trim()).filter(Boolean) || [],
          cropPreferences: values.cropPreferences?.split(',').map(s => s.trim()).filter(Boolean) || [],
          irrigationAvailable: values.irrigationAccess,
          lastSeasonYield: values.lastSeasonYield || 0,
          farmingChallenges: values.farmingChallenges || '',
          uploadedFiles: [], // Placeholder for file upload functionality
          aiInsightsGenerated: false,
          createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'farmerSubmissions'), submissionData);

      toast({
        title: 'Farm Data Submitted!',
        description: 'Your data has been submitted. AI analysis is being processed.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Accordion type="multiple" defaultValue={['farm-location', 'farm-details']} className="w-full">
                <AccordionItem value="farm-location">
                    <AccordionTrigger className="text-lg font-semibold text-primary">Farm Location & Size</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                             <FormField
                                control={form.control}
                                name="farmSize"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Land Size (acres)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 5" {...field} disabled={isLoading} />
                                    </FormControl>
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
                                            <Input placeholder="e.g., Molo" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="farm-details">
                     <AccordionTrigger className="text-lg font-semibold text-primary">Farm Conditions & Crops</AccordionTrigger>
                     <AccordionContent className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="soilType"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Soil Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                    <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Loam">Loam</SelectItem>
                                        <SelectItem value="Clay">Clay</SelectItem>
                                        <SelectItem value="Sandy">Sandy</SelectItem>
                                        <SelectItem value="Silt">Silt</SelectItem>
                                        <SelectItem value="Peaty">Peaty</SelectItem>
                                        <SelectItem value="Chalky">Chalky</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="irrigationAccess"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Irrigation Available?</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cropsPlanted"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Crops Currently Planted</FormLabel>
                                    <FormControl><Input placeholder="e.g., Maize, Beans" {...field} /></FormControl>
                                    <FormDescription>Separate multiple crops with a comma.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="cropPreferences"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Crop Preferences for Next Season</FormLabel>
                                    <FormControl><Input placeholder="e.g., Potatoes, Cabbages" {...field} /></FormControl>
                                    <FormDescription>What you are considering planting.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastSeasonYield"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Last Season's Yield (in bags, optional)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 50" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="farmingChallenges"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Biggest Farming Challenges</FormLabel>
                                    <FormControl><Textarea placeholder="e.g., Pests and diseases, low market prices, unpredictable weather..." {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <FormLabel>Upload Files (Optional)</FormLabel>
                            <FormControl>
                                <Input type="file" disabled />
                            </FormControl>
                            <FormDescription>Upload soil test results, photos, etc.</FormDescription>
                        </FormItem>
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
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit for Analysis
          </Button>
        </div>
      </form>
    </Form>
  );
}
