'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail, Fingerprint, Award, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BuyerInfoProps {
    userData: {
        name?: string;
        phone?: string;
        email?: string;
        experience?: string;
        kraPin?: string;
    } | null;
    loading: boolean;
}

export default function BuyerInfo({ userData, loading }: BuyerInfoProps) {
    const buyerData = {
        fullName: userData?.name || 'N/A',
        phone: userData?.phone || 'N/A',
        email: userData?.email || 'N/A',
        nationalId: '********',
        experience: userData?.experience || 'Lead Buyer, Fresh Produce Inc.',
        kraPin: userData?.kraPin || 'Not provided',
    };

    const infoItems = [
        { icon: <User />, label: "Full Name", value: buyerData.fullName },
        { icon: <Phone />, label: "Phone Number", value: buyerData.phone },
        { icon: <Mail />, label: "Email", value: buyerData.email },
        { icon: <FileText />, label: "KRA PIN / Business Reg. No.", value: buyerData.kraPin },
        { icon: <Fingerprint />, label: "National ID", value: buyerData.nationalId },
        { icon: <Award />, label: "Role/Title", value: buyerData.experience },
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
