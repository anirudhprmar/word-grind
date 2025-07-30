import {  MailIcon, } from 'lucide-react';
import Link from 'next/link';


export default function Footer() {
  return (
    <footer className='bg-[#CFDDC0] py-10 mx-10 mb-10 rounded-xl'>
       <div  className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
         <div className="grid md:grid-cols-3   gap-12">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <div className=" rounded-xl p-3 shadow-lg">
                {/* <Image src="/images/logoBlack.png" alt="logo" width={60} height={10}  /> */}
              </div>
              {/* <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-3 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div> */}
              <div>
                <span className="text-xl font-bold">Vocab Grinder </span>
                <div className="text-xs text-gray-900 font-medium">Speak with elegance</div>
              </div>
            </div>
            <span className='font-light'>Copyright © 2025 - All rights reserved</span>
            
          </div>

        
          <div>
            <h3 className="text-lg font-bold mb-8 text-gray-900 bg-clip-text ">
              LINKS
            </h3>
            <div>
             <ul className="space-y-2 mb-8">
              <li>Login</li>
              <li>Demo</li>
              <li>Pricing</li>
              {/* <li>discord Join Us</li> */}
             </ul>
            </div>

           
          
          </div>
         
          <div>
            <h3 className="text-lg font-bold mb-8 text-gray-900 bg-clip-text ">
                CONTACT 
            </h3>
            <div className="space-y-2 flex flex-col ">
              <Link href="https://x.com/anirudhprmar" target="_blank" rel="noopener noreferrer">X</Link>
              <Link href="mailto:anirudhparmar2004@gmail.com" className="flex gap-1">
                <MailIcon />Mail
              </Link>
            </div>
          
          </div>
        </div>
       </div>
    </footer>
  )
}
