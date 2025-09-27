
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronUp, ChevronDown, ShoppingCart } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const priceData = [
  { crop: 'Maize', location: 'Nairobi', price: 65, trend: 5, lastUpdated: 'Today', grade: 'A' },
  { crop: 'Beans', location: 'Nakuru', price: 110, trend: -2, lastUpdated: 'Yesterday', grade: 'B' },
  { crop: 'Tomatoes', location: 'Kiambu', price: 130, trend: 8, lastUpdated: 'Today', grade: 'A' },
  { crop: 'Potatoes', location: 'Eldoret', price: 50, trend: 0, lastUpdated: '3 days ago', grade: 'C' },
  { crop: 'Avocado', location: 'Muranga', price: 90, trend: 3, lastUpdated: 'Today', grade: 'A' },
];

export default function BuyerProductListings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Product Discovery</CardTitle>
        <CardDescription>
          Live prices from different markets. Search and filter to find the best opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for a crop..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Filter by County" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nairobi">Nairobi</SelectItem>
              <SelectItem value="nakuru">Nakuru</SelectItem>
              <SelectItem value="kiambu">Kiambu</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Filter by Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maize">Maize</SelectItem>
              <SelectItem value="beans">Beans</SelectItem>
              <SelectItem value="tomatoes">Tomatoes</SelectItem>
            </SelectContent>
          </Select>
           <Button>
              <Search className="mr-2 h-4 w-4" /> Find Produce
          </Button>
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Avg. Price (KES/kg)</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceData.map((item) => (
                <TableRow key={`${item.crop}-${item.location}`}>
                  <TableCell className="font-medium">{item.crop}</TableCell>
                  <TableCell>{item.location}</TableCell>
                   <TableCell><Badge variant="outline">{item.grade}</Badge></TableCell>
                  <TableCell className="font-bold text-primary">KES {item.price}</TableCell>
                  <TableCell>
                    <Badge variant={item.trend > 0 ? 'default' : item.trend < 0 ? 'destructive' : 'secondary'} className="bg-opacity-20 text-foreground">
                      {item.trend > 0 ? <ChevronUp className="mr-1 h-3 w-3"/> : item.trend < 0 ? <ChevronDown className="mr-1 h-3 w-3"/> : null}
                      {item.trend}%
                    </Badge>
                  </TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                      <Button size="sm"><ShoppingCart className="mr-2 h-4 w-4" /> Buy</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

    