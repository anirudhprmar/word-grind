'use client'
import { ArrowLeft, Loader2Icon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Toaster } from '~/components/ui/sonner';
import { api } from '~/lib/api';

interface FeedbackPageProps {
 params: Promise<{ quizId: string }>
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

export default function FeedbackPage({ params }: FeedbackPageProps) {
   const unwrappedParams = React.use(params);
  const quizId = unwrappedParams.quizId;

    const searchParams = useSearchParams()
    const word = searchParams.get("word") 

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
    <main className='container mx-auto p-5 relative min-h-full'>
      <section className='flex flex-col items-center justify-center gap-4'>
        
        <div className='flex flex-col items-center justify-center'>
          <h1 className='font-bold text-2xl'>Quiz Complete!</h1>
          <h2 className='underline text-lg font-medium'>{word}</h2>
      </div>

        <div>
          <p className='text-xl'>Completed Quiz in : {minutes ? minutes+" min :": null}{seconds} sec</p>
        </div>
      </section>
      
      <section className='flex items-center flex-col justify-center pt-5 h-fit mt-10 font-serif'>
        <div className='font-medium text-2xl'>Total Questions: {report?.totalQuestions}</div>
        <div className='font-medium text-2xl '>Your Score: {report?.score}</div>

        <div className='text-2xl'>{report?.result === "failure" ? "Needs Improvement📈" : "Good Job🎉"}</div>
      </section>

      <div className='absolute bottom-10 right-10'>
            <Button onClick={handleBackToQuizzes}
            size={'lg'}
            className='font-bold hover:transition-shadow hover:shadow-xl cursor-pointer shadow-md'
            >
            <ArrowLeft/> Back to Quizzes
            </Button>
      </div>

      <Toaster/>
    </main>
  );
}


