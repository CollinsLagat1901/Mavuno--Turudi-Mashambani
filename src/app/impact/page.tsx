
'use client';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { impactData } from './impact-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip as UiTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImpactPage = () => {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-accent py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline text-primary">
                {impactData.title}
              </h1>
              <p className="text-lg md:text-xl text-accent-foreground/90">
                {impactData.paragraph}
              </p>
            </div>
          </div>
        </section>

        {/* Impact Tiles */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {impactData.tiles.map((tile) => (
                <Card key={tile.id} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">{tile.valueFormatted}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-2">
                      {tile.label}
                      <TooltipProvider>
                        <UiTooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{tile.shortDescription}</p>
                            <p className="mt-2 text-xs font-mono bg-muted p-2 rounded">{tile.formula}</p>
                          </TooltipContent>
                        </UiTooltip>
                      </TooltipProvider>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Charts Section */}
        <section className="py-16 md:py-24 bg-muted">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="grid gap-8 md:grid-cols-2">
                    {impactData.charts.map(chart => (
                        <Card key={chart.id}>
                            <CardHeader>
                                <CardTitle>{chart.title}</CardTitle>
                                <CardDescription>{chart.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <ResponsiveContainer width="100%" height={350}>
                                    {chart.type === 'bar' ? (
                                        <BarChart data={chart.datasets[0].data.map((value, i) => ({ name: chart.labels[i], value }))}
                                            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis tickFormatter={(value) => `KES ${value.toLocaleString()}`} />
                                            <Tooltip formatter={(value: number) => [`KES ${value.toLocaleString()}`, chart.datasets[0].label]} />
                                            <Bar dataKey="value" fill="#006400" />
                                        </BarChart>
                                    ) : (
                                        <BarChart data={chart.labels.map((label, i) => ({ name: label, value: chart.datasets[0].data[i] }))}
                                            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis tickFormatter={(value) => `KES ${value}B`} />
                                            <Tooltip formatter={(value: number) => [`KES ${value} Billion`, chart.datasets[0].label]} />
                                            <Bar dataKey="value" fill="#FFD700" />
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Assumptions Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-2xl font-bold font-headline">Assumptions, Methodology & Citations</AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div dangerouslySetInnerHTML={{ __html: impactData.assumptionsHtml }} />
                   <div className="mt-6">
                        <h4 className='text-lg font-semibold'>Citations</h4>
                        <ul className="list-decimal pl-5 mt-2 text-sm space-y-1">
                            {impactData.citations.map(cite => (
                                <li key={cite.id}>
                                    {cite.text} (<a href={`http://${cite.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">{cite.shortUrl}</a>)
                                </li>
                            ))}
                        </ul>
                   </div>
                   <Button className="mt-6" onClick={() => {
                       const blob = new Blob([impactData.csvData], { type: 'text/csv;charset=utf-8;' });
                       const link = document.createElement("a");
                       const url = URL.createObjectURL(blob);
                       link.setAttribute("href", url);
                       link.setAttribute("download", "mavuno_impact_data.csv");
                       link.style.visibility = 'hidden';
                       document.body.appendChild(link);
                       link.click();
                       document.body.removeChild(link);
                   }}>
                        Download Raw Data (CSV)
                    </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ImpactPage;
