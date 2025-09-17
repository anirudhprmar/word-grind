'use client'
import { LoaderCircle } from "lucide-react"
import { DataTable } from "~/app/dashboard/collection/_components/data-table"
import { api } from "~/lib/api"
import { toast } from "sonner"
import { Toaster } from "~/components/ui/sonner"
import SessionInfo from "~/components/SessionInfo"
import { useEffect, useState } from "react"
import { columns, type Words } from "~/app/dashboard/collection/_components/columns"


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

        if (isLoading) {
          return (  <div className="flex items-center justify-center h-full">
        <LoaderCircle className="size-10 animate-spin" />
      </div>)
        }
        if(error){
          toast.error( `${error.message}`)
        }

        const words:Words[] = data ?? []


  return (
    <div className="p-4">
        {/* rendered table will come here */}
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={words} userId={userId} />
        </div>
    <Toaster/>
    </div>
  )
}
