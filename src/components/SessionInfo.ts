'use server'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '~/lib/auth';

export default async function SessionInfo() {
   const session = await auth.api.getSession({
        headers:await headers()
      })
    
      if(!session) {
            redirect("/")
        }

    const userId:string = session?.user?.id ;

    return userId
}
