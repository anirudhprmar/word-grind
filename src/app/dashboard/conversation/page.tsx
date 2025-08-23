import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { auth } from '~/lib/auth'

export default async function page() {
    const session = await auth.api.getSession({
            headers:await headers()
          })
        
          if(!session) {
                redirect("/")
            }
  return (
    <div>
      hi from conversation
    </div>
  )
}
