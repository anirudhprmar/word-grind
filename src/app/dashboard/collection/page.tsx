'use client'
import { Loader2Icon } from "lucide-react"
import { columns, type Words } from "../../_wordsCollection/columns"
import { DataTable } from "../../_wordsCollection/data-table"
import { api } from "~/lib/api"
import { toast } from "sonner"
import { Toaster } from "~/components/ui/sonner"
import SessionInfo from "~/app/_components/SessionInfo"
import { useEffect, useState } from "react"
import { getSubscriptionDetails } from "~/lib/subscription"
import Link from "next/link"
import { Button } from "~/components/ui/button"


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


export default function Collection() {
      const[userId,setUserId] = useState<string>("")
       const [subDetails,SetSubDetails] = useState<subDetailsProps | null>(null)

      useEffect(()=>{
        async function fetchUserId() {
          const id = await SessionInfo()
          setUserId(id)
        }
         void fetchUserId()
      },[])

     useEffect(()=>{
    let isActive = true
    async function fetchData(){
      const subscriptionDetails = await getSubscriptionDetails()
      if (isActive) SetSubDetails(subscriptionDetails)
    }
    void fetchData()
    return ()=> {isActive = false}
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
          toast.error( `${error.message}`)
        }

        const words:Words[] = data ?? []


  return (
    
      <div>

        {!subDetails?.hasSubscription ||
                          subDetails?.subscription?.status !== "active" ? (
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
                          ) : (
      <div className="p-4">
        {/* rendered table will come here */}
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={words} userId={userId} />
        </div>
      </div>
      )}
        <Toaster/>
      </div>
  )
}
