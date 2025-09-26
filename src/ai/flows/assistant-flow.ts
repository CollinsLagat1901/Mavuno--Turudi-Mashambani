'use server';
/**
 * @fileOverview This file defines the Genkit flow for the Mavuno AI Assistant.
 *
 * This flow powers the chat interface, enabling farmers to have a natural
 * conversation with an AI to get personalized advice about their farm.
 * It uses a tool to fetch the user's farm data to provide contextual answers.
 *
 * - chat - The main function that handles a new chat message from the user.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { getUserDataTool } from '@/ai/tools/user-tools';
import { z } from 'genkit';
import { Part } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({ text: z.string() })),
});

export const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.string();
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return assistantFlow(input);
}

const assistantPrompt = ai.definePrompt({
  name: 'assistantPrompt',
  tools: [getUserDataTool],
  input: { schema: z.object({ message: z.string() }) },
  output: { format: 'text' },
  prompt: `You are Mavuno Assistant, a friendly and expert AI advisor for Kenyan farmers.
Your goal is to provide helpful, actionable, and personalized advice.

- Use the tools available to you to fetch user data (like farm location, size, soil type) to tailor your recommendations. For example, if the user asks for the best crop, use the tool to get their location first.
- If you don't have enough information, ask clarifying questions. For example: "To give you the best recommendation, I need to know your county. Can you please tell me which county your farm is in?"
- Keep your answers concise, clear, and easy to understand for all farmers, regardless of their technical knowledge.
- Your persona is knowledgeable, encouraging, and supportive. Your name is Mavuno.
- When providing recommendations, explain your reasoning. For example, "I recommend maize because it is well-suited for the soil in Nakuru and current market prices are high."
- You MUST answer in the same language as the user's query.

Start the conversation now. The user has sent the following message:
{{{message}}}
`,
});

const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, message }) => {
    const { text } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      history: history as Part[],
      prompt: {
        role: 'user',
        content: [{ text: message }],
      },
      tools: [getUserDataTool],
      system: `You are Mavuno Assistant, a friendly and expert AI advisor for Kenyan farmers.
Your goal is to provide helpful, actionable, and personalized advice.

- Use the tools available to you to fetch user data (like farm location, size, soil type) to tailor your recommendations. For example, if the user asks for the best crop, use the tool to get their location first.
- If you don't have enough information, ask clarifying questions. For example: "To give you the best recommendation, I need to know your county. Can you please tell me which county your farm is in?"
- Keep your answers concise, clear, and easy to understand for all farmers, regardless of their technical knowledge.
- Your persona is knowledgeable, encouraging, and supportive. Your name is Mavuno.
- When providing recommendations, explain your reasoning. For example, "I recommend maize because it is well-suited for the soil in Nakuru and current market prices are high."
- You MUST answer in the same language as the user's query.
`,
    });

    return text;
  }
);
