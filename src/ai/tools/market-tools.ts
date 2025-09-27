
'use server';
/**
 * @fileOverview This file defines a Genkit tool for fetching market data.
 * This allows the AI assistant to access real-time prices for crops in different locations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MarketDataSchema = z.object({
  price: z.number().describe('The average price of the crop in the specified location, in KES per kg.'),
  trend: z.string().describe('The recent price trend (e.g., "+5%", "-2%", "stable").'),
  lastUpdated: z.string().describe('When the price was last updated.'),
});

// This is a mock data source. In a real app, this would query a database or external API.
const mockPriceData: Record<string, Record<string, { price: number, trend: string }>> = {
    'Nairobi': { 'Maize': { price: 65, trend: '+5%' }, 'Beans': { price: 115, trend: '-2%' } },
    'Nakuru': { 'Maize': { price: 60, trend: '+4%' }, 'Beans': { price: 110, trend: '-2%' } },
    'Kiambu': { 'Tomatoes': { price: 130, trend: '+8%' } },
    'Eldoret': { 'Potatoes': { price: 50, trend: '0%' } },
    'Muranga': { 'Avocado': { price: 90, trend: '+3%' } },
};

export const getMarketDataTool = ai.defineTool(
  {
    name: 'getMarketData',
    description: "Get the current market price, trend, and last update time for a specific crop in a given Kenyan county.",
    inputSchema: z.object({
        crop: z.string().describe('The crop to get the price for, e.g., "Maize".'),
        location: z.string().describe('The county to get the price for, e.g., "Nakuru".'),
    }),
    outputSchema: MarketDataSchema,
  },
  async ({crop, location}) => {
    const locationData = mockPriceData[location];
    if (!locationData) {
        throw new Error(`Sorry, I don't have market data for ${location}.`);
    }
    const cropData = locationData[crop];
    if (!cropData) {
        throw new Error(`Sorry, I don't have price information for ${crop} in ${location}.`);
    }
    
    return {
        price: cropData.price,
        trend: cropData.trend,
        lastUpdated: 'Today' // Mocked for simplicity
    };
  }
);
