"use server"

import { generateText } from 'ai';

import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey:process.env.GEMINI_API_KEY
});


export async function getQuizInfo(prompt:string, totalQuestions:number){
     const {text} = await generateText({
       model: google('gemini-2.5-flash-lite'),
       system: `Generate a quiz of ${totalQuestions} multiple-choice questions for the word. Each question must have:
      "question": a string
      "choices": 4 options (one correct)
      "correct": the correct choice
      optional "explanation"

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

