'use client'
import { Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import SessionInfo from "~/app/_components/SessionInfo"
import type { Words } from "~/app/_wordsCollection/columns"
import DisplayWord from "~/components/DisplayWord"
import { Toaster } from "~/components/ui/sonner"
import { api } from "~/lib/api"


export default function Quiz() {

    const[userId,setUserId] = useState<string>("")
  
        useEffect(()=>{
          async function fetchUserId() {
            const id = await SessionInfo()
            setUserId(id)
          }
           void fetchUserId()
        },[])
          
           const { data, isLoading,error  } = api.word.listWords.useQuery({
            userId: userId,
          });
          //cache the query ????
  
          if (isLoading) {
            return (<div className="text-center  w-full translate-x-[50%] translate-y-[70%]  mx-auto">
              <Loader2Icon className="animate-spin"/>
            </div>)
          }
          if(error){
            toast( `${error.message}`)
          }
  
          const words:Words[] = data ?? []
          const filteredWords = words.filter(w => w.learned !== true)
          const fewWords = filteredWords.splice(0,5) 

  return (
    <main className="container mx-auto flex flex-col justify-between gap-10">

      <section className="flex flex-col gap-2 items-center justify-center pt-3">
        <h1 className="text-3xl font-bold font-serif">Test Yourself</h1>
        <p className="font-regular text-md">Do you acutally understand word ??</p>
      </section>

      <section className="flex flex-wrap gap-3  items-center justify-center"> 

      {fewWords?.map(word =>(
        <div key={word.id} >
        {/* render the words in displayword component */}
        <DisplayWord
            id={word.id} userId={word.userId} name={word.name } learned={false}        />
        </div>
      ))}

      </section>

      <Toaster/>
    </main>
  )
}
