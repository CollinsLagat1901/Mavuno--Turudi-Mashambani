
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin, Globe, ShoppingBag } from 'lucide-react';

const companyData = {
  name: 'Fresh Produce Inc.',
  location: 'Nairobi, Industrial Area',
  website: 'https://freshproduce.co.ke',
  type: 'Wholesale & Export',
};

const companyInfoItems = [
    { icon: <Building />, label: "Company Name", value: companyData.name },
    { icon: <MapPin />, label: "Head Office", value: companyData.location },
    { icon: <Globe />, label: "Website", value: companyData.website },
    { icon: <ShoppingBag />, label: "Business Type", value: companyData.type },
]

export default function CompanyInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>Details about your business or organization.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {companyInfoItems.map(item => (
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
