'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
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

const farmDetailsSchema = z.object({
  farmName: z.string().min(2, 'Farm name must be at least 2 characters'),
  farmSize: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Farm size must be a positive number')
  ),
  county: z.string().min(1, 'Please select your county from the map'),
  subCounty: z.string().min(2, 'Sub-county is required'),
  latitude: z.number(),
  longitude: z.number(),
  soilType: z.enum(['Sandy', 'Loamy', 'Clay', 'Unknown']).optional(),
});

type FarmDetailsValues = z.infer<typeof farmDetailsSchema>;

export function FarmDetailsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FarmDetailsValues>({
    resolver: zodResolver(farmDetailsSchema),
    defaultValues: {
      farmName: '',
      farmSize: 0,
      county: '',
      subCounty: '',
      latitude: -0.3031,
      longitude: 36.0800,
      soilType: 'Unknown',
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
      await setDoc(
        userRef,
        {
          farm: {
            name: values.farmName,
            size: values.farmSize,
            location: {
              county: values.county,
              subCounty: values.subCounty,
              lat: values.latitude,
              lng: values.longitude,
            },
            soilType: values.soilType,
          },
        },
        { merge: true }
      );

      toast({
        title: 'Farm Details Saved!',
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
        <FormField
          control={form.control}
          name="farmName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What do you call your farm?</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Green Acres"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="farmSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Farm Size (in acres)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormLabel>Where is your farm located?</FormLabel>
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
        
        <FormField
          control={form.control}
          name="soilType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soil Type (Optional)</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your soil like?" />
                  </SelectTrigger>
                </FormControl>
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
