
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


interface FarmData {
     crops?: {
        [key: string]: {
            name?: string;
            stage?: string;
            season?: string;
            method?: string;
            expectedYield?: number | string;
        }
    }
}

interface CropInfoProps {
    farmData: FarmData | null | undefined;
    loading: boolean;
}

export default function CropInfo({ farmData, loading }: CropInfoProps) {
  const crops = farmData?.crops ? Object.values(farmData.crops) : [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Crops Grown</CardTitle>
         <Button variant="outline" size="sm" disabled>
            <PlusCircle className="mr-2" />
            Add New Crop
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Yield</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            <div className="flex justify-center items-center">
                                <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading crops...
                            </div>
                        </TableCell>
                    </TableRow>
                ) : crops.length > 0 ? (
                    crops.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.name || 'N/A'}</TableCell>
                        <TableCell>{item.stage || 'N/A'}</TableCell>
                        <TableCell>{item.season || 'N/A'}</TableCell>
                        <TableCell>{item.method || 'N/A'}</TableCell>
                        <TableCell>{String(item.expectedYield) || 'N/A'}</TableCell>
                    </TableRow>
                    ))
                ) : (
                     <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No crops added yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
