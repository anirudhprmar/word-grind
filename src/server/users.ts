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
    await auth.api.signInEmail({
        body: {
            email: data.email,
            password:data.password,
        }
    })

   
}


export const signUp = async (data:signUpdataProps) => {
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
}