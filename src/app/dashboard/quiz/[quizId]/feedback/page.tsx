'use client'
import { ArrowLeft, Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Toaster } from '~/components/ui/sonner';
import { api } from '~/lib/api';

interface FeedbackPageProps {
 params: { quizId: string };
 searchParams: { word?: string };
}

interface QuizProp{
   id: number;
    userId: string;
    wordId: number;
    createdAt: Date;
    completedAt: Date | null;
    result: "success" | "failure" | "null" | null;
    feedback: string;
    suggestion: string;
    score: number;
    totalQuestions: number;
}

export default function FeedbackPage({ params, searchParams }: FeedbackPageProps) {
  const { quizId } = params;
  const { word } = searchParams;
  const router = useRouter();

  const { data, isLoading,error  } = api.quiz.getQuizDetails.useQuery({
    quizId:parseInt(quizId,10)
  })

      if (isLoading) {
        return (<div className="text-center  w-full translate-x-[50%] translate-y-[70%]  mx-auto">
          <Loader2Icon className="animate-spin"/>
        </div>)
      }
         
      if(error){
        toast( `${error.message}`)
      }

      const result:QuizProp[] = data  ?? []
      console.log(result)
      const report: QuizProp | undefined = result[0];



      const start = report?.createdAt.toString()
      const end = report?.completedAt?.toString()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const startTime:any = new Date(start ?? "")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const EndTime:any = new Date(end ?? "")

      const timeDiff:number = EndTime - startTime
      const minutes = Math.floor(timeDiff / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
  
  const handleBackToQuizzes = async() => {
   router.push('/dashboard/quiz'); 
  };

  return (
    <div>
      <div>
        <h1>Quiz Complete!</h1>
        <h2>{word}</h2>

        <div>
          <p>Completed Quiz in : {minutes ? minutes+":": null}{seconds}</p>
        </div>
      </div>
      
      <div>
        <div>Total Questions: {report?.totalQuestions}</div>
        <div>Your Score: {report?.score}</div>

        <div>{report?.result}</div>
      </div>

      <Button onClick={handleBackToQuizzes}>
       <ArrowLeft/> Back to Quizzes
      </Button>

      <Toaster/>
    </div>
  );
}


