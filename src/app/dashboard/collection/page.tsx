import { columns, type Payment } from "../../_wordsCollection/columns"
import { DataTable } from "../../_wordsCollection/data-table"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "~/lib/auth"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here. get word trpc
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}


export default async function Page() {

      const session = await auth.api.getSession({
        headers:await headers()
      })
    
      if(!session) {
            redirect("/")
        }

  const data = await getData()
  const userId = session.user.id 

  return (
    
      <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center ">
        {/* rendered table will come here */}
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} userId={userId} />
        </div>
      </div>

      </div>
  )
}
