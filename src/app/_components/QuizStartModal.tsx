"use client"
import { useEffect, useState } from "react"

import { Button } from "~/components/ui/button"
import { Toaster } from "~/components/ui/sonner"
import { api } from "~/lib/api"
import { XIcon } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


interface wordInfoProps {
    wordInfo:{
    id:number
    userId: string
    name:string
    meaning:string
    example:string[]
    pronunciation:string
    synonyms:string[]
    createdAt:Date
    learned:boolean
    },
    totalQuestions:number
}

interface wordProp{ 
    id:number
    userId: string
    name:string
    meaning:string
    example:string[]
    pronunciation:string
    synonyms:string[]
    createdAt:Date
    learned:boolean
}

export function QuizStartModal({wordInfo,totalQuestions,onClose}:wordInfoProps & {onClose?:()=>void}) {

  const [isOpen,setIsOpen] = useState(false)
  const [word,setWord] = useState<wordProp | null>(null)
  const startQuiz = api.quiz.createQuiz.useMutation()
  const router = useRouter()

    
    useEffect(()=>{
      if(wordInfo) {
        setWord(wordInfo)
        setIsOpen(true)
    }
    },[wordInfo])
  
  
    const handleStartingQuiz = async()=>{
      try {
         if(!word?.id) return;

        const result = await startQuiz.mutateAsync({userId:word?.userId,wordId:word?.id,totalQuestion:totalQuestions})

           if (result?.quiz ?? result?.quiz[0]?.id) {
               const url = `/dashboard/quiz/${result?.quiz[0]?.id}?totalQuestions=${encodeURIComponent(totalQuestions.toString())}&name=${encodeURIComponent(word?.name ?? '')}`;
                  router.push(url);
                 toast("Quiz started! 🎉")
                 setWord(null)
                 setIsOpen(false)
                  if (onClose) {
                    onClose();
                  }
               }
       } catch (error) {
        console.log("error in adding word",error)
      if (startQuiz.isError) {
        toast(`${startQuiz.error.message}`)
      }
       }
    }


    const handleIgnore = () => { 
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    }

  return (
    <div>
     { isOpen && <div className="fixed inset-0 z-50 bg-black/50">
     <div className=" bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]  gap-4 rounded-lg border p-6  shadow-lg duration-200 sm:max-w-lg max-h-full  overflow-auto ">
       <div>
          <p className=" font-serif text-center text-lg leading-none font-semibold">Do you want to begin your quiz with the word {word?.name}</p>
        </div>


        <div className="sm:justify-start">
              <Button type="button" variant="secondary" onClick={handleIgnore}
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" 
              >
                <XIcon/> 
              </Button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <div>
              <Button type="button" disabled={startQuiz.isPending} onClick={handleStartingQuiz} variant="secondary" className="cursor-pointer">
                {startQuiz.isPending ? "Starting..." : "Start the Quiz"}
              </Button>
            </div>

            <div>
              <Button type="button" variant="secondary" onClick={handleIgnore}
              className="cursor-pointer"
              >
                Ignore 
              </Button>
            </div>
          </div>
        </div>
      </div>
  </div>}
      <Toaster/>
   </div>
  )
}
