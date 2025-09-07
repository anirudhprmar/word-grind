'use client'


import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { signUp } from "~/server/betterAuth"
import { authClient } from "~/lib/auth-client"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Toaster } from "./ui/sonner"

const formSchema = z.object({
  name:z.string().min(2),
  email:z.email(),
  password:z.string().min(8)
})



export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const [loading,setLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name:"",
      email: "",
      password: "",
    },
  })
 
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
   try {
    setLoading(true)
    const {success,message} = await signUp(values)

    if (success) {
      toast.success(message)
      router.push('/dashboard')
    }else{
      toast.error(message)
    }

    setLoading(false)
   } catch (error) {
    console.log(error)
   }
  }

   const signInGoogle = async () =>{
      await authClient.signIn.social({
          provider:"google",
          callbackURL:"/dashboard"
      })
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <span className="sr-only">WordGrind</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to WordGrind</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
                 <Link href={'/login'} className="underline underline-offset-4">
                Login 
                </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3 grid-rows-2">
                    <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" type="text" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                    <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" type="email" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                    <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="yourpassword" type="password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin"/> : "Sign Up"}
            </Button>
          </div>
          <div className="text-right text-sm">
            Try signing up with email?{" "}
            <Link href={'/login/email-login'} className="underline underline-offset-4">
            Sign up with email
            </Link>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 grid-cols-1">
           
            <Button variant="outline" type="button" className="w-full" onClick={signInGoogle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>
      </form>
      </Form>
      <Toaster/>
    </div>
  )
}
