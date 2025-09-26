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
      'A list of recommended crops for the farmer, based on their location, market data, and profit optimization.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the crop recommendations, including market trends and profit analysis.'
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

  Based on the farmer's location (county), desired crops, and any additional details they provide, you will recommend the optimal crops to grow for maximum profitability.

  Consider real-time market data, regional suitability, and profit optimization when making your recommendations.

  County: {{{county}}}
  Crops: {{{crops}}}
  Additional Details: {{{additionalDetails}}}

  Provide a clear and concise list of recommended crops, along with a detailed explanation of your reasoning.
  The reasoning should be detailed and include market trends and profit analysis.`,
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
