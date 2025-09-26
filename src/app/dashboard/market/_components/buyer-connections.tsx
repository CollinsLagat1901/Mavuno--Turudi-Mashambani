'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Handshake } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const buyers = [
  { name: 'Fresh Produce Inc.', location: 'Nairobi', crops: ['Avocado', 'Mangoes'], price: 'Negotiable' },
  { name: 'Nakuru Millers', location: 'Nakuru', crops: ['Maize', 'Wheat'], price: 'Market Rate' },
  { name: 'Kiambu Exporters', location: 'Kiambu', crops: ['Tomatoes', 'French Beans'], price: 'KES 140/kg' },
];

export default function BuyerConnections() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="space-y-1">
            <CardTitle>Connect with Buyers</CardTitle>
            <CardDescription>
            A marketplace for direct farmer-to-buyer connections.
            </CardDescription>
        </div>
        <Button>
            <Handshake className="mr-2" /> List My Produce
        </Button>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {buyers.map((buyer) => (
          <Card key={buyer.name} className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4">
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${buyer.name.replace(/\s/g, '')}.png`} alt={buyer.name} />
                <AvatarFallback>{buyer.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{buyer.name}</p>
                <p className="text-sm text-muted-foreground">{buyer.location}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                <div>
                    <p className="text-xs font-semibold mb-1 text-muted-foreground">Crops Needed:</p>
                    <div className="flex flex-wrap gap-1">
                        {buyer.crops.map(crop => <Badge key={crop} variant="secondary">{crop}</Badge>)}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-muted-foreground">Price Offered:</p>
                     <p className="font-semibold">{buyer.price}</p>
                </div>
            </CardContent>
            <div className="flex border-t">
              <Button variant="ghost" className="w-1/2 rounded-none rounded-bl-lg">
                <Phone className="mr-2" /> Call
              </Button>
              <Button variant="ghost" className="w-1/2 rounded-none rounded-br-lg border-l">
                <MessageSquare className="mr-2" /> Message
              </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
