
'use server';
/**
 * @fileOverview This file defines the Genkit flow for the Mavuno AI Assistant for Buyers.
 *
 * This flow powers the chat interface for produce buyers, enabling them to have a
 * natural conversation with an AI to get market data and sourcing advice.
 * It uses a tool to fetch real-time market data to provide helpful answers.
 *
 * - buyerChat - The main function that handles a new chat message from the user.
 * - BuyerChatInput - The input type for the buyerChat function.
 * - BuyerChatOutput - The return type for the buyerChat function.
 */

import { ai } from '@/ai/genkit';
import { getMarketDataTool } from '@/ai/tools/market-tools';
import { z } from 'genkit';
import { Part } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const BuyerChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
});
export type BuyerChatInput = z.infer<typeof BuyerChatInputSchema>;

const BuyerChatOutputSchema = z.string();
export type BuyerChatOutput = z.infer<typeof BuyerChatOutputSchema>;

export async function buyerChat(input: BuyerChatInput): Promise<BuyerChatOutput> {
  return buyerAssistantFlow(input);
}

const buyerAssistantFlow = ai.defineFlow(
  {
    name: 'buyerAssistantFlow',
    inputSchema: BuyerChatInputSchema,
    outputSchema: BuyerChatOutputSchema,
  },
  async ({ history, message }) => {
     const genkitHistory = history.map(msg => ({
        role: msg.role,
        content: [{ text: msg.content }]
    }));

    const { text } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      history: genkitHistory,
      prompt: message,
      tools: [getMarketDataTool],
      system: `You are Mavuno Assistant, a friendly and expert AI advisor for produce buyers in Kenya.
Your goal is to provide helpful, actionable, and data-driven advice for sourcing agricultural products.

- Use the tools available to you to fetch real-time market data (like crop prices in specific locations). For example, if the user asks for the price of maize, use the tool to get the data for their requested location.
- If you don't have enough information, ask clarifying questions. For example: "To get the price for you, I need to know which county you're interested in."
- Keep your answers concise, clear, and easy to understand.
- Your persona is knowledgeable, efficient, and professional. Your name is Mavuno.
- When providing data, present it clearly. For example, "The current price for Maize in Nakuru is KES 65 per kg."
- You can also help draft offers or messages to farmers.
- You MUST answer in the same language as the user's query.
`,
    });

    return text;
  }
);
