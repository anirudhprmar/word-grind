"use client"
import { LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import SessionInfo from "~/app/_components/SessionInfo"
import { api } from "~/lib/api"

interface QuizProps {
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

export default function UserProfile() {

      const[userId,setUserId] = useState<string>("")

     useEffect(()=>{
            async function fetchUserId() {
              const id = await SessionInfo()
              setUserId(id)
            }
             void fetchUserId()
          },[])

         const { data , isLoading,error  } = api.quiz.listQuizzes.useQuery({
            userId: userId,
          });

          
          if (isLoading) {
            return (  <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>)

          }
          if(error){
            toast.error( `${error.message}`)
          }

          const quizList:QuizProps[] = data ?? []
          console.log("quiz list",quizList)
  
  return (
    <div className="max-w-56 text-center">
      {JSON.stringify(quizList)}
    </div>
  )
}
