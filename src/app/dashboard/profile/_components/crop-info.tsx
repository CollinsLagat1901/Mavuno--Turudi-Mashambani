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
import { PlusCircle } from 'lucide-react';

const crops = [
  { crop: 'Maize', stage: 'Growing', season: 'Long Rains', method: 'Conventional', yield: '25 bags' },
  { crop: 'Beans', stage: 'Planting', season: 'Short Rains', method: 'Organic', yield: '10 bags' },
];

export default function CropInfo() {
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
                {crops.map((item) => (
                <TableRow key={item.crop}>
                    <TableCell className="font-medium">{item.crop}</TableCell>
                    <TableCell>{item.stage}</TableCell>
                    <TableCell>{item.season}</TableCell>
                    <TableCell>{item.method}</TableCell>
                    <TableCell>{item.yield}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
