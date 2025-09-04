"use server"

import { generateText } from 'ai';

import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey:process.env.GEMINI_API_KEY
});

// change the prompt to generate questions and answers

export async function getWordInfo(prompt:string){
     const {text} = await generateText({
       model: google('gemini-2.5-flash-lite'),
       system: `For any user word (even with typos), reply with only a plain JavaScript object, nothing else, and do NOT use markdown or backticks. Your response must be exactly:
   {
     "name": "corrected word if typo, else as given",
     "meaning": "definition",
     "example": ["sentence 1", "sentence 2"],
     "pronunciation": "short phonetic",
     "synonyms": ["synonym1", ...]
   }
   Absolutely do not include any triple backticks or specify 'json' or any other language.
   .`,
       prompt,
     });

     return text
}