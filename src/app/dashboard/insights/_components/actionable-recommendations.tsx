import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const actions = [
  { text: 'Prepare land for maize planting this week.' },
  { text: 'Source certified maize seeds before prices increase.' },
  { text: 'Plan to add organic manure to improve soil fertility.' },
];

export default function ActionableRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What to Do Next</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {actions.map((action, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="flex-1 text-sm">{action.text}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6" disabled>Mark as Done (Coming Soon)</Button>
      </CardContent>
    </Card>
  );
}
