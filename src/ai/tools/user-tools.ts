
'use server';
/**
 * @fileOverview This file defines a Genkit tool for fetching the current user's farm data from Firestore.
 * This allows the AI assistant to access contextual information about the user to provide personalized advice.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getAuth } from 'firebase/auth/server';
import { getFirestore } from 'firebase/firestore/lite';
import { doc, getDoc } from 'firebase/firestore/lite';
import { app } from '@/lib/firebase-config'; // Assuming you have a way to get the admin app

const UserDataSchema = z.object({
  farmName: z.string().optional(),
  farmSize: z.number().optional(),
  county: z.string().optional(),
  subCounty: z.string().optional(),
  soilType: z.string().optional(),
});

export const getUserDataTool = ai.defineTool(
  {
    name: 'getUserData',
    description: "Get the current user's farm details like location, size, and soil type.",
    inputSchema: z.object({}), // No input needed
    outputSchema: UserDataSchema,
  },
  async () => {
    // WARNING: This is a simplified example. In a real app, you would need
    // a secure way to get the currently authenticated user's ID on the server.
    // This might involve passing an auth token from the client to the flow.
    // For this prototype, we'll assume a hardcoded user ID for demonstration.
    const userId = '8r4sJ2Df5HUPQ4aF2P3Tq9g8xYz2'; // Replace with a real user ID from your Firestore
    
    if (!userId) {
      throw new Error('User not authenticated.');
    }

    const db = getFirestore(app);
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists() || !userDoc.data().farms || !userDoc.data().farms.farm1) {
      return {
        error: "User has not provided their farm details yet. Ask them to fill out the form."
      }
    }

    const farmData = userDoc.data().farms.farm1;
    return {
      farmName: farmData.name,
      farmSize: farmData.size,
      county: farmData.location?.county,
      subCounty: farmData.location?.subCounty,
      soilType: farmData.soilType,
    };
  }
);

    