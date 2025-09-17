'use client'
import { LoaderCircle } from "lucide-react"
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
import { getSubscriptionDetails, isUserSubscribed } from "~/lib/subscription"
import Link from "next/link"

type SubscriptionDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  organizationId: string | null;
};

interface subDetailsProps{
    hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
}



export default function Quiz() {

    const[userId,setUserId] = useState<string>("")
    const[isClicked,setisClicked] = useState<boolean>(false)
    const [finalNumQuestions,setFinalNumQuestions] = useState<number>(2)
    const [subDetails,SetSubDetails] = useState<boolean>(false)
    
    
               useEffect(()=>{
                let isActive = true
                async function fetchData(){
                  const subscriptionDetails = await isUserSubscribed()
                  if (isActive) SetSubDetails(subscriptionDetails)
                }
                void fetchData()
                return ()=> {isActive = false}
              },[])
  
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
          
  
          if (isLoading) {
            return (  <div className="flex items-center justify-center h-fit">
        <LoaderCircle className="size-10 animate-spin" />
      </div>)
          }
          if(error){
            toast.error( `${error.message}`)
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
    <div>
       {subDetails ? (
        <main className="container mx-auto flex flex-col justify-between gap-10">

            <section className="flex flex-col gap-2 items-center justify-center pt-3">
              <h1 className="text-3xl font-bold font-serif">Test Yourself</h1>
              <p className="font-regular text-md">Do you acutally understand word ??</p>
            </section>

            <section className="flex flex-col gap-10  items-center justify-center"> 
          
          {fewWords.length >= 1 && <div className="flex flex-col gap-2">
              choose the number of questions
              <div className="flex items-center justify-center gap-3">
                <Slider defaultValue={[2]} max={10} step={1} onValueChange={handleValueChange} />
                <span>{finalNumQuestions}</span>
              </div>
            </div>}

            <div className="flex gap-3 flex-wrap mx-10 md:mx-auto px-10">
                  {fewWords.length >= 1 ? fewWords?.map(word =>(
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
                  )): <div >
                    <Link href={'/dashboard'} className="font-bold cursor-pointer ">
                      No new words found! Add some new words to start quiz.
                    </Link>
            </div>}

        </div>

        <div>
        {fewWords.length > 5 && <Button
        size={'lg'}
        onClick={()=>setisClicked(!isClicked)}
        className=" hover:transition-shadow hover:shadow-xl cursor-pointer shadow-md"
        >
          More..
        </Button>  }

          {isClicked && 
          <SearchWordsModal filteredWords={newWords} NumOfQuestion={finalNumQuestions}/>
          }

        </div>

        </section>

      </main>    
      ) : ( 
          <>
            <div className="absolute inset-0 z-10 rounded-lg  flex items-center justify-center">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center max-w-md">
                <h3 className="text-xl font-semibold mb-2">
                  Subscription Required
                </h3>
                <p className="text-muted-foreground mb-4">
                  You need an active subscription to access payment management
                  features.
                </p>
                <Link href="/pricing">
                  <Button>Subscribe Now</Button>
                </Link>
              </div>
            </div>
          </>
        )}
        <Toaster/>
    </div>
  )
}
