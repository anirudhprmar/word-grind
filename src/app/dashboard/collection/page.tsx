'use client'
import { Loader2Icon } from "lucide-react"
import { columns, type Words } from "../../_wordsCollection/columns"
import { DataTable } from "../../_wordsCollection/data-table"
import { api } from "~/lib/api"
import { toast } from "sonner"
import { Toaster } from "~/components/ui/sonner"
import SessionInfo from "~/app/_components/SessionInfo"
import { useEffect, useState } from "react"



export default function Collection() {
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

  return (
    
      <div>
      <div className="p-4">
        {/* rendered table will come here */}
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={words} userId={userId} />
        </div>
      </div>
        <Toaster/>
      </div>
  )
}
