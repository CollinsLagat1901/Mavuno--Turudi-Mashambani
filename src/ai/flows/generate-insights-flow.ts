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
import { z } from 'genkit';

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
    .array(z.string())
    .describe('A list of the top 2-3 recommended crops.'),
  profitabilityScore: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'A score from 0 to 1 indicating the overall profitability potential.'
    ),
  expectedYield: z
    .string()
    .describe('An estimated yield for the top recommended crop, e.g., "30 bags per acre".'),
  marketPriceEstimates: z
    .array(
      z.object({
        crop: z.string(),
        pricePerKg: z.number(),
      })
    )
    .describe('Estimated market prices for the recommended crops.'),
  suggestedBuyers: z
    .array(
      z.object({
        name: z.string(),
        contact: z.string(),
        location: z.string(),
      })
    )
    .describe('A list of potential buyers for the recommended crops.'),
  advice: z
    .string()
    .describe(
      'A detailed summary of the reasoning and next steps for the farmer.'
    ),
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
  prompt: `You are an expert agricultural AI advisor for Kenyan farmers named "Entity AI".
  Your task is to analyze the following farm data and provide a detailed, structured recommendation in JSON format.

  **Farm Data:**
  - County: {{{county}}}
  - Sub-County: {{{subCounty}}}
  - Land Size: {{{landSize}}} acres
  - Soil Type: {{{soilType}}}
  - Irrigation Available: {{{irrigationAvailable}}}
  - Currently Planted Crops: {{{cropsPlanted}}}
  - Farmer's Preferred Crops for Next Season: {{{cropPreferences}}}
  - Last Season's Yield: {{{lastSeasonYield}}} bags
  - Farmer's Biggest Challenges: "{{{farmingChallenges}}}"

  **Your Analysis and Recommendations:**
  1.  **recommendedCrops**: Based on the location, soil type, and market demand in Kenya, recommend the top 2-3 most profitable and suitable crops. Prioritize the farmer's preferences if they are viable.
  2.  **profitabilityScore**: Provide an overall score from 0.0 to 1.0 representing the potential for profitability if the farmer follows your advice.
  3.  **expectedYield**: Estimate the yield for the top recommended crop.
  4.  **marketPriceEstimates**: Give current estimated prices for your recommended crops in the specified county or a major nearby market.
  5.  **suggestedBuyers**: Suggest 1-2 fictional but realistic buyers or market channels (e.g., "Nakuru Millers", "Local Export Agent") for the recommended crops.
  6.  **advice**: Write a comprehensive but easy-to-understand paragraph summarizing your recommendations. Explain WHY you chose these crops, referencing the farmer's specific conditions (e.g., "Since you have irrigation, tomatoes are a high-value option..."). Give one or two actionable next steps.

  Provide your response ONLY in the requested JSON format.`,
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
