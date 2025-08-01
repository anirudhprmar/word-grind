import { signIn } from "~/server/auth"

export function SigninButton() {
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div>
        {/* <form action={
          async ()=> {
            "use server"
            const req = await signIn("credentials", { redirectTo: "/dashboard" })
            if (!req) {
              throw new Error("Failed to sign in")
            }
          }
        }
        className="flex flex-col space-y-4"
        >
          <label className="flex flex-col">
            Email
            <input type="text" placeholder="email" className="border bg-gray-300" />
          </label>
          <label className="flex flex-col">
            Username
            <input type="text" placeholder="username" className="border bg-gray-300"/>
          </label>
          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">Sign in</button>

        </form> */}
      </div>

      <span>or</span>

      <div>
        <form action={
          async()=>{
            "use server"
            await signIn("google", { redirectTo: "/dashboard" })
          }
        }
        >
        <button type="submit" className="bg-blue-500  text-white px-4 py-2 rounded">
          Sign in 
        </button>

        </form>

      </div>
    </div>
  )
}