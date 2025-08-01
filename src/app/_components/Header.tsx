import Image from 'next/image'
import React from 'react'
import { auth } from '~/server/auth'

export default async function AuthNavbar() {
       const session = await auth()
        if (!session) return <div>Not authenticated</div>
    
        const user = session.user
  return (
    <div className='bg-primary text-primary-foreground flex p-2 '>
      <div className='flex-1 pl-5 text-3xl font-bold'>
        {session ? `Welcome, ${user?.name }` : 'Welcome Guest'}
      </div>

        <div className='dropdown-end dropdown'>
           {user &&
             <label
            tabIndex={0}
            className='btn-ghost btn-circle avatar'
            >
            <div className='w-10 rounded-full'>
                <img src={user?.image ?? ""}  alt={'User Avatar'} />
            </div>

            </label>}
        </div>
    </div>
  )
}
