'use client'
import { Loader2Icon } from "lucide-react"
import { columns, type Words } from "../../_wordsCollection/columns"
import { DataTable } from "../../_wordsCollection/data-table"
import { api } from "~/lib/api"
import { toast } from "sonner"
import { Toaster } from "~/components/ui/sonner"
import SessionInfo from "~/app/_components/SessionInfo"
import { useEffect, useState } from "react"



export default function Page() {
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
          return (<div>
            <Loader2Icon className="animate-spin"/>
          </div>)
        }
        if(error){
          toast( `${error.message}`)
        }

        const words:Words[] = data ?? []

  return (
    
      <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center ">
        {/* rendered table will come here */}
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={words} userId={userId} />
        </div>
      </div>
        <Toaster/>
      </div>
  )
}
