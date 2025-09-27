'use server';
/**
 * @fileOverview This file defines the Genkit flow for generating detailed AI insights based on a farmer's submission.
 *
 * This flow takes a farmer's detailed submission data, sends it to an AI model for analysis,
 * and returns structured, actionable recommendations.
 *
 * - generateInsights - The main function that triggers the AI analysis.
 * - GenerateInsightsInput - The input type for the generateInsights function.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateInsightsInputSchema = z.object({
  soilType: z.string(),
  landSize: z.number(),
  county: z.string(),
  subCounty: z.string(),
  cropsPlanted: z.array(z.string()),
  cropPreferences: z.array(z.string()),
  irrigationAvailable: z.boolean(),
  lastSeasonYield: z.number().optional(),
  farmingChallenges: z.string(),
});
export type GenerateInsightsInput = z.infer<typeof GenerateInsightsInputSchema>;

const GenerateInsightsOutputSchema = z.object({
  recommendedCrops: z
    .array(
      z.object({
        cropName: z.string(),
        expectedProfit: z.number().describe('Estimated profit in KES.'),
        reasoning: z.string(),
      })
    )
    .describe('A list of the top 3 recommended crops.'),
  soilRecommendation: z
    .string()
    .describe(
      'A concise recommendation for soil improvement (e.g., "Apply lime to balance pH.").'
    ),
  diseaseWarnings: z
    .array(
      z.object({
        disease: z.string(),
        probability: z.enum(['low', 'medium', 'high']),
        prevention: z.string(),
      })
    )
    .describe('A list of potential disease risks for the region and crop.'),
  weatherSummary: z
    .string()
    .describe('A brief summary of the weather forecast and planting advice.'),
  nextSteps: z
    .array(z.string())
    .describe('A list of clear, actionable next steps for the farmer.'),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(
  input: GenerateInsightsInput
): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow(input);
}

const generateInsightsPrompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  input: { schema: GenerateInsightsInputSchema },
  output: { schema: GenerateInsightsOutputSchema },
  prompt: `You are Entity AI, an agricultural intelligence assistant helping Kenyan farmers make data-driven decisions. Your goal is to analyze the farm details provided and generate personalized, actionable insights that help the farmer maximize profit and reduce risks.

  **Farmer's Data:**
  - County: {{{county}}}, {{{subCounty}}}
  - Soil Type: {{{soilType}}}
  - Acreage: {{{landSize}}}
  - Currently Planted Crops: {{{cropsPlanted}}}
  - Farmer's Preferred Crops for Next Season: {{{cropPreferences}}}
  - Last Season's Yield: {{{lastSeasonYield}}} bags
  - Farmer's Biggest Challenges: "{{{farmingChallenges}}}"
  - Irrigation: {{{irrigationAvailable}}}

  **Simulated Reference Data:**
  - Regional Market Prices: Maize (KES 45/kg), Beans (KES 80/kg), Potatoes (KES 55/kg)
  - Soil Data: Loamy soil in Nakuru is good for maize but can be improved with compost.
  - Disease Data: Medium risk of Maize Lethal Necrosis in the region.
  - Weather: Rainfall expected in late October, suitable for planting.

  **Your Task:**
  Based on all the data above, provide a detailed, structured response in the required JSON format.

  1.  **Top 3 Recommended Crops**: Analyze the farmer's preferences against market prices and suitability. Suggest the top 3 crops with potential yield and estimated market value.
  2.  **Soil Improvement Recommendations**: Is the current soil type suitable? Suggest fertilizers or amendments.
  3.  **Disease Risk Alerts**: Identify major diseases for the region/crop, their probability, and prevention steps.
  4.  **Weather Summary & Planting Advice**: Give the seasonal forecast, best planting window, and any irrigation advice.
  5.  **Actionable Next Steps**: Provide clear, simple steps the farmer should take.

  Be factual, realistic, and concise. Focus on profitability, risk reduction, and clarity.
  Return your answer ONLY as a structured JSON.`,
});

const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    inputSchema: GenerateInsightsInputSchema,
    outputSchema: GenerateInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await generateInsightsPrompt(input);
    if (!output) {
        throw new Error("The AI failed to generate a valid insight. Please try again.");
    }
    return output;
  }
);
