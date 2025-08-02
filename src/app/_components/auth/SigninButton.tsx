import { signIn } from "~/server/auth"

export function SigninButton() {
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">

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