"use server"

import { generateText } from 'ai';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { createMistral } from '@ai-sdk/mistral';
import { env } from '~/env';

const google = createGoogleGenerativeAI({
  apiKey:env.GEMINI_API_KEY
});
// const mistral = createMistral({
//   apiKey:env.MISTRAL_API_KEY
// });

export async function getQuizInfo(prompt:string, totalQuestions:number){
     const {text} = await generateText({
      //  model: mistral('mistral-large-latest'),
       model: google('gemini-2.5-flash-lite'),
       system: `Generate a quiz of ${totalQuestions} multiple-choice questions for the word. Each question must have:
      "question": a string
      "choices": 4 options (all are randomized in any order, one correct)
      "correct": the correct choice
      "explanation": short and sweet

      Output ONLY a JSON array of objects like:
        [
          {
          "question": "...",
          "choices": ["...", "...", "...", "..."],
          "correct": "...",
          "explanation": "..."
          },
        ...
        ]
      Ensure the correct choice is one of the choices, randomize choices order, and output exactly {totalQuestions} questions. No triple backticks or language tags.`,
       prompt,
     });

     return text
}

