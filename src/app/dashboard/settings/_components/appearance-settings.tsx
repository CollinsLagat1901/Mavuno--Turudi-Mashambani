'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages, Palette, Moon, Sun } from 'lucide-react';

const translations = {
  en: {
    title: 'Appearance',
    description: 'Customize the look and feel of the application.',
    language: 'Language',
    darkMode: 'Dark Mode',
    theme: 'Theme',
    defaultTheme: 'Default'
  },
  sw: {
    title: 'Muonekano',
    description: 'Badilisha mwonekano na hisia za programu.',
    language: 'Lugha',
    darkMode: 'Hali ya Giza',
    theme: 'Mandhari',
    defaultTheme: 'Chaguo-msingi'
  }
}

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState('en');
  const t = translations[language as keyof typeof translations];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            <span>{t.language}</span>
          </Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="sw">Kiswahili</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span>{t.darkMode}</span>
          </Label>
          <Switch 
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <span>{t.theme}</span>
          </Label>
           <p className="text-sm text-muted-foreground">{t.defaultTheme}</p>
        </div>
      </CardContent>
    </Card>
  );
}
