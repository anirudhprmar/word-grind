import { auth } from "~/server/auth"
import { api } from "~/trpc/server"



export default async function Dashboard() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>

    const user = session.user
    const data =  await api.user.getUserInfo()

    const userInfo = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
    }
    
  return (
    <div>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        <pre>Hello</pre>
        <div>
          <p>{JSON.stringify(data)}</p>
        </div>
    </div>
  )
}
