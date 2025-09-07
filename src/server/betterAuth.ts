"use server";
import { auth } from "~/lib/auth"

interface signIndataProps{
    email:string
    password:string
}

interface signUpdataProps{
    name:string
    email:string
    password: string;
    image?: string | undefined;
    callbackURL?: string | undefined;
    rememberMe?: boolean | undefined;
}


export const signIn = async (data:signIndataProps) => {
 try {
       await auth.api.signInEmail({
           body: {
               email: data.email,
               password:data.password,
           }
       })
   
       return{
        success:true,
        message:"Signed in successfully."
       }

 } catch (error) {
    const e = error as Error
    return{
        success:false,
        message:e.message ?? "An Unknown error occured."
       }
 }
}


export const signUp = async (data:signUpdataProps) => {
try {
        await auth.api.signUpEmail({
            body: {
                name:data.name,
                email: data.email,
                password: data.password,
                callbackURL:"/dashboard",
                image:data.image,
                rememberMe:data.rememberMe
            }
        })

        return{
        success:true,
        message:"Signed up successfully."
        }
} catch (error) {
    const e = error as Error
    return{
    success:false,
    message:e.message ?? "An Unknown error occured."
    }
}
}

