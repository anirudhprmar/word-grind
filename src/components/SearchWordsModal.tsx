"use client"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { Toaster } from "~/components/ui/sonner"
import { XIcon } from "lucide-react"
// import { toast } from "sonner"
import { SearchWordsDataTable } from "~/app/_components/SearchWordsDataTable"

interface filteredWordsProp{
      id: number;
    userId: string;
    name: string;
    meaning: string;
    pronunciation: string | null;
    example: string[] | null;
    synonyms: string[] | null;
    createdAt: Date;
    updatedAt: Date | null;
    learned: boolean;
}

interface WordInfoModalProps {
  filteredWords: filteredWordsProp[];
  NumOfQuestion:number
}

import { columns} from "../app/_components/SearchWordsColumns"


export default function WordInfoModal({filteredWords,NumOfQuestion}:WordInfoModalProps) {

  const [isOpen,setIsOpen] = useState(false)
  const [words,setWords] = useState<filteredWordsProp[] | null>(null)

  useEffect(()=>{
    setIsOpen(true)
  },[])
  
  useEffect(()=>{
    if(!filteredWords) return;
      setWords(filteredWords)
    },[filteredWords])
  


    const handleIgnore = () =>( 
      setIsOpen(!isOpen) 
     )

      const AllWords:filteredWordsProp[]  = words ?? []

  return (
    <div>
     { isOpen && <div className="fixed inset-0 z-50 bg-black/50">
     <div className=" bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]  gap-4 rounded-lg border p-6  shadow-lg duration-200 sm:max-w-lg max-h-full  overflow-auto ">
       <div>
         <div className="container mx-auto py-10">
                <SearchWordsDataTable columns={columns}  data={AllWords} userId={AllWords[0]?.userId ?? ""}  totalQuestions={NumOfQuestion}/>
              </div>
        </div>

        <div className="sm:justify-start">
              <Button type="button" variant="secondary" onClick={handleIgnore}
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" 
              >
                <XIcon/> 
              </Button>
        </div>
      </div>
  </div>}
      <Toaster/>
   </div>
  )
}