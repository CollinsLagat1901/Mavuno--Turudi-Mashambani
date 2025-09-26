'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages, Palette, Moon } from 'lucide-react';

export default function AppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            <span>Language</span>
          </Label>
          <Select defaultValue="english">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="swahili">Kiswahili</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            <span>Dark Mode</span>
          </Label>
          <Switch disabled />
        </div>
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <span>Theme</span>
          </Label>
           <p className="text-sm text-muted-foreground">Default</p>
        </div>
      </CardContent>
    </Card>
  );
}
