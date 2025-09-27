
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Handshake, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const farmers = [
  { name: 'Jembe Haraka', location: 'Nakuru', crops: ['Maize', 'Beans'], rating: 4.8, verified: true },
  { name: 'Shamba Bora Farms', location: 'Eldoret', crops: ['Potatoes', 'Wheat'], rating: 4.5, verified: true },
  { name: 'Kilimo Fresh', location: 'Kiambu', crops: ['Tomatoes', 'Cabbages', 'Kales'], rating: 4.9, verified: false },
];

export default function BuyerFarmerConnections() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="space-y-1">
            <CardTitle>Verified Farmer Profiles</CardTitle>
            <CardDescription>
            Discover and connect with reliable farmers.
            </CardDescription>
        </div>
        <Button variant="outline">
            View All Farmers
        </Button>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {farmers.map((farmer) => (
          <Card key={farmer.name} className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4">
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${farmer.name.replace(/\s/g, '')}.png`} alt={farmer.name} />
                <AvatarFallback>{farmer.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{farmer.name}</p>
                <p className="text-sm text-muted-foreground">{farmer.location}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold">{farmer.rating}</span>
                    </div>
                    {farmer.verified && <Badge>Verified</Badge>}
                </div>
                <div>
                    <p className="text-xs font-semibold mb-1 text-muted-foreground">Main Crops:</p>
                    <div className="flex flex-wrap gap-1">
                        {farmer.crops.map(crop => <Badge key={crop} variant="secondary">{crop}</Badge>)}
                    </div>
                </div>
            </CardContent>
            <div className="flex border-t">
              <Button variant="ghost" className="w-1/2 rounded-none rounded-bl-lg">
                <MessageSquare className="mr-2" /> Message
              </Button>
              <Button variant="ghost" className="w-1/2 rounded-none rounded-br-lg border-l">
                View Profile
              </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

    