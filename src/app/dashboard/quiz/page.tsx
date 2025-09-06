'use client'
import { Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import SessionInfo from "~/app/_components/SessionInfo"
import type { Words } from "~/app/_wordsCollection/columns"
import DisplayWord from "~/components/DisplayWord"
import SearchWordsModal from "~/components/SearchWordsModal"
import { Button } from "~/components/ui/button"
import { Toaster } from "~/components/ui/sonner"
import { api } from "~/lib/api"
import { Slider } from "~/components/ui/slider"



export default function Quiz() {

    const[userId,setUserId] = useState<string>("")
    const[isClicked,setisClicked] = useState<boolean>(false)
    const [finalNumQuestions,setFinalNumQuestions] = useState<number>(2)
  
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
          // cache the query ????
  
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
          const newWords = [...filteredWords]
          const fewWords = filteredWords.splice(0,5)
          
         const handleValueChange = (newValue: number[]) => {
          const value:number = newValue[0] ?? 2
            setFinalNumQuestions(value)
    }
          

  return (
    <main className="container mx-auto flex flex-col justify-between gap-10">

      <section className="flex flex-col gap-2 items-center justify-center pt-3">
        <h1 className="text-3xl font-bold font-serif">Test Yourself</h1>
        <p className="font-regular text-md">Do you acutally understand word ??</p>
      </section>

      <section className="flex flex-col gap-10  items-center justify-center"> 
    
      <div className="flex flex-col gap-2">
        choose the number of questions
        <div className="flex items-center justify-center gap-3">
          <Slider defaultValue={[2]} max={10} step={1} onValueChange={handleValueChange} />
          <span>{finalNumQuestions}</span>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap mx-10 md:mx-auto px-10">
            {fewWords?.map(word =>(
              <div key={word.id} >
              <DisplayWord
              info={{
                id:word.id,
                userId:word.userId,
                name:word.name,
                meaning:word.meaning,
                pronunciation:word.pronunciation ?? "null",
                synonyms:word.synonyms ?? ["null"],
                example:word.example ?? ["null"],
                createdAt:word.createdAt,
                learned:word.learned
              }}
              total={finalNumQuestions}  />
              </div>
            ))}

      </div>

      <div>
      <Button
      size={'lg'}
      onClick={()=>setisClicked(!isClicked)}
      className=" hover:transition-shadow hover:shadow-xl cursor-pointer shadow-md"
      >
        More..
      </Button>  

         {isClicked && 
        <SearchWordsModal filteredWords={newWords} NumOfQuestion={finalNumQuestions}/>
        }

      </div>

      </section>

      <Toaster/>
    </main>
  )
}
