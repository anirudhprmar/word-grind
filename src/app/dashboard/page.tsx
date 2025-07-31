import { auth } from "~/server/auth/config"



export default async function Dashboard() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>

    const user = session.user
    console.log("User:", user)

    const userInfo = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
    }
 
  return (
    <div>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        <pre>Hello</pre>
    </div>
  )
}
