
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail, Fingerprint, Award } from 'lucide-react';

const buyerData = {
  fullName: 'Collins Buyer',
  phone: '+254 700 111 222',
  email: 'collins.buyer@mavuno.co.ke',
  nationalId: '********',
  experience: 'Lead Buyer, Fresh Produce Inc.',
};

const infoItems = [
    { icon: <User />, label: "Full Name", value: buyerData.fullName },
    { icon: <Phone />, label: "Phone Number", value: buyerData.phone },
    { icon: <Mail />, label: "Email", value: buyerData.email },
    { icon: <Fingerprint />, label: "National ID", value: buyerData.nationalId },
    { icon: <Award />, label: "Role/Title", value: buyerData.experience },
]

export default function BuyerInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {infoItems.map(item => (
            <div key={item.label} className="flex items-start gap-3">
                <div className="text-primary flex-shrink-0 w-5 mt-1">{item.icon}</div>
                <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
