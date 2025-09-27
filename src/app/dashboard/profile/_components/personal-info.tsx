
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail, Fingerprint, Languages, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PersonalInfoProps {
  userData: {
    name?: string;
    phone?: string;
    email?: string;
    experience?: string;
    language?: string;
  } | null;
  loading: boolean;
}

export default function PersonalInfo({ userData, loading }: PersonalInfoProps) {
    const personalData = {
        fullName: userData?.name || 'N/A',
        phone: userData?.phone || 'N/A',
        email: userData?.email || 'N/A',
        nationalId: '********',
        language: userData?.language || 'English',
        experience: userData?.experience || 'N/A',
    };

    const infoItems = [
        { icon: <User />, label: "Full Name", value: personalData.fullName },
        { icon: <Phone />, label: "Phone Number", value: personalData.phone },
        { icon: <Mail />, label: "Email", value: personalData.email },
        { icon: <Fingerprint />, label: "National ID", value: personalData.nationalId },
        { icon: <Languages />, label: "Preferred Language", value: personalData.language },
        { icon: <Award />, label: "Farming Experience", value: personalData.experience },
    ]

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
                        {loading ? <Skeleton className="h-5 w-32 mt-1" /> : <p className="font-medium">{item.value}</p>}
                    </div>
                </div>
            ))}
            </div>
        </CardContent>
        </Card>
    );
}
