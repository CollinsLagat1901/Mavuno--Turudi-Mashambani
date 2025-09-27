'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing dynamic crop recommendations to Kenyan farmers.
 *
 * The flow takes the farmer's location and desired crops as input, and uses real-time market data and
 * AI-driven intelligence to suggest optimal crops for maximizing profitability.
 *
 * - dynamicCropRecommendations - A function that initiates the crop recommendation process.
 * - DynamicCropRecommendationsInput - The input type for the dynamicCropRecommendations function.
 * - DynamicCropRecommendationsOutput - The return type for the dynamicCropRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicCropRecommendationsInputSchema = z.object({
  county: z.string().describe('The county in Kenya where the farmer is located.'),
  crops: z.string().describe('The crops the farmer is considering growing, comma separated.'),
  additionalDetails: z
    .string()
    .optional()
    .describe(
      'Any additional information the farmer wants to provide, such as soil conditions or access to irrigation.'
    ),
});
export type DynamicCropRecommendationsInput = z.infer<
  typeof DynamicCropRecommendationsInputSchema
>;

const DynamicCropRecommendationsOutputSchema = z.object({
  recommendedCrops: z
    .string()
    .describe(
      'A list of the top 3 recommended crops for the farmer, comma-separated, based on their location, market data, and profit optimization. Example: "Maize, Beans, Potatoes"'
    ),
  reasoning: z
    .string()
    .describe(
      'A concise, one-sentence reasoning for the top recommendation. Example: "Maize is prioritized due to strong market demand in Nakuru and its suitability for your farm\'s conditions."'
    ),
});
export type DynamicCropRecommendationsOutput = z.infer<
  typeof DynamicCropRecommendationsOutputSchema
>;

export async function dynamicCropRecommendations(
  input: DynamicCropRecommendationsInput
): Promise<DynamicCropRecommendationsOutput> {
  return dynamicCropRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicCropRecommendationsPrompt',
  input: {schema: DynamicCropRecommendationsInputSchema},
  output: {schema: DynamicCropRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides crop recommendations to Kenyan farmers.

  Your task is to analyze a list of potential crops and recommend the top 3 for maximum profitability, based on the farmer's location and other details.

  **Farmer's Information:**
  - County: {{{county}}}
  - Crops to consider: {{{crops}}}
  - Additional Details: {{{additionalDetails}}}

  **Your Analysis Must Consider:**
  1.  **Profitability:** Prioritize crops with the highest current market price and demand in the specified county.
  2.  **Suitability:** Factor in general suitability for the region (e.g., potatoes in Nyandarua, maize in the Rift Valley).
  3.  **Farmer's Context:** Use any additional details provided.

  **Instructions:**
  1.  From the list of 'Crops to consider', select and rank the top 3 most profitable and suitable crops.
  2.  Format the output strictly as a comma-separated list in the 'recommendedCrops' field (e.g., "Maize, Potatoes, Beans").
  3.  Provide a single, clear sentence in the 'reasoning' field explaining why the #1 crop was chosen, mentioning either a market or suitability factor.`,
});

const dynamicCropRecommendationsFlow = ai.defineFlow(
  {
    name: 'dynamicCropRecommendationsFlow',
    inputSchema: DynamicCropRecommendationsInputSchema,
    outputSchema: DynamicCropRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
