import {  MailIcon, } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type RefObject } from 'react';

interface AboutProps{
  scrollFunction:(ref: RefObject<HTMLElement | null>) => void;
  refs: {
    features: RefObject<HTMLElement | null>;
    demo: RefObject<HTMLElement | null>;
    pricing: RefObject<HTMLElement | null>;
  }
}

type navItemsProps = {
  label: string;
  href: string;
  section: RefObject<HTMLElement | null>;
}[];

export default function Footer({scrollFunction,refs}:AboutProps) {

  const [isMounted,setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  const navItems:navItemsProps = [
    { label: 'Features', href: '',section:refs.features },
    { label: 'Demo', href: '',section:refs.demo },
    { label: 'Pricing', href: '',section:refs.pricing },
  ]

  
    const router = useRouter()
      const pathName = usePathname()

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.section) {
      e.preventDefault()
      
      if (!isMounted) return // Don't do anything if not mounted yet
      
      if (pathName === '/') {
        scrollFunction(item.section)
      } else {
        router.push('/')
        setTimeout(() => {
          scrollFunction(item.section)
        }, 100)
      }
    }
  }
  return (
    <footer className='bg-secondary'>
       <div  className="container mx-auto px-10 pb-10 ">
         <div className="flex  flex-row justify-around items-center gap-10 flex-wrap mx-auto p-5 w-full">

          {/* Company Info */}
          <div >
            <div className="flex items-center space-x-3 mb-8">
              <div>
                <span className="text-xl md:text-3xl font-bold">Word Grind </span>
                <div className="text-sm text-gray-900 font-medium ">Speak with elegance</div>
              </div>
            </div>            
          </div>

        <div className='flex mx-auto justify-around gap-10  '>
          <div className='flex flex-col '>
            <h3 className="text-lg font-bold  text-gray-900 bg-clip-text ">
              LINKS
            </h3>
            <div>
             <ul className='space-y-2'>
              {navItems.map((item) => (
                <li key={item.label} className=' '>
                  <Link 
                    href={item.href}
                    onClick={(e) =>{
                       handleNavClick(e, item)
                      }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            </div>

          </div>
         
          <div>
            <h3 className="text-lg font-bold  text-gray-900 bg-clip-text ">
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
       </div>
    </footer>
  )
}
