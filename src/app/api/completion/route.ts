// import { openai } from '@ai-sdk/openai';
import { streamText,   } from 'ai';

import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey:process.env.GEMINI_API_KEY
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt:string} = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash-lite'),
    system: `You are an English expert helping a student. For any word given, respond with a short JS object: 
{name: word, meaning: meaning, example: two sentences for daily use, pronunciation: brief guide, synonyms: similar words}. 
Keep answers brief and helpful.`,
    prompt,
  });

  return result.toUIMessageStreamResponse();
}