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
    system: 'You are a helpful English Master expert in communication and vocabulary. Treat User like a student and whatever word the user will share with you, you need to give details about the word like its meaning, some examples where user can use this word in their normal day to day life just 2 will be fine, how to pronounce it, and some synonyms so that your student learns about a new word by which the user will learn a new word and expand their vocabulary. keep your response short and sweet and give me in the response in an js object form {name:user given word,meaning:meaning of the word,example:example sentences,pronunciation:how to pronounce short and sweet,synonyms:other words which mean the same}. And I really appritiate you being so kind and helpful ',
    prompt,
  });

  return result.toUIMessageStreamResponse();
}