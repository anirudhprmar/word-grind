'use client'
import { ChevronRight, Menu, X } from "lucide-react"
import Image from "next/image"
// import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, type RefObject } from "react"
import { Button } from "~/components/ui/button"


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

function Navbar({scrollFunction,refs}:AboutProps) {
  
  const [isMounted,setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  const [isOpen,setisOpen] = useState(false)

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
    <header  >
      <nav className=" py-2 fixed  bg-primary-foreground bg-opacity-30  z-10  left-0 right-0 flex items-center justify-around max-w-full md:mx-auto p-2 px-4 sm:px-6 text-black shadow-md  transition-all duration-200">
        <Link href={'/'}>
            <div className="flex items-center justify-center gap-2">
                <Image src={'/wordgrindLogo.png'} width={'50'} height={'50'} alt="wordgrind logo, a cartoon with pencil in one hand and surrounded by a letter A" className="rounded-md"/>

                <span className="text-xl font-bold dark:text-foreground ">WordGrind</span>
            </div>
        </Link>
         <div className='hidden md:block'>
            <ul className='flex items-center gap-8'>
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
              >
                <Link
                  onClick={(e) => handleNavClick(e, item)}
                  href={item.href}
                  className="font-light text-md lg:text-lg transition-colors cursor-pointer dark:text-foreground"
                  style={{ display: "inline-block" }} // ensures transform works as expected
                >
                  <span
                    className="inline-block"
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
            </ul>
          </div>

        <div className="hidden md:flex gap-5 items-center">
            <Link className="text-xl cursor-pointer dark:text-foreground" href={'/sign-in'}>Sign In</Link>
            <Link className="bg-foreground text-primary-foreground p-2 font-bold rounded-lg cursor-pointer" href={'/pricing'} >Get WordGrind</Link>
        </div>

      {/* Mobile Menu Button */}
          <Button
             size='sm'
          variant='default'
            className='md:hidden p-2  rounded-lg transition-colors bg-foreground'
            onClick={() => setisOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
      </nav>
      {/* Mobile Navigation Dropdown - Seamless Extension */}
        <div
        className={`md:hidden fixed z-50 top-20  left-6 right-6 max-w-full mx-auto bg-primary-foreground rounded-xl shadow-sm transition-all duration-200 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 z-50' : 'max-h-0 opacity-0 '
        }`}>
          <div className='py-4 px-6'>
            <ul className='space-y-4'>
              {navItems.map((item) => (
                <li key={item.label} className='text-center '>
                  <Link 
                    href={item.href}
                    className='block font-light text-foreground hover:text-gray-600 transition-colors py-2'
                    onClick={(e) =>{
                       setisOpen(false)
                       handleNavClick(e, item)
                      }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='mt-6 pt-4 border-t border-gray-200'>
              <Link
                href={'/pricing'}
                className='w-full flex items-center  gap-1 text-sm bg-foreground text-primary-foreground p-2 rounded-lg  '
                onClick={() => setisOpen(false)}
              >
                Get WordGrind
                <ChevronRight className='size-5' />
              </Link>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Navbar
