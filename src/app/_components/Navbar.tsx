// import Image from "next/image"
import Link from "next/link"


function Navbar() {
  return (
    <header  >
      <nav className="top-5 fixed rounded-full backdrop-filter backdrop-blur-lg bg-opacity-30 bg-transparent  z-10  left-0 right-0 flex items-center justify-between max-w-86 sm:max-w-100 md:max-w-150 lg:max-w-220  mx-auto py-2 px-4 sm:px-6 text-black shadow-sm  transition-all duration-200">
        <Link href={'/'}>
            <div>
                {/* <Image src={''} width={''} height={''}/> */}
                <span className="text-xl font-bold ">Vocab Grinder</span>
            </div>
        </Link>
        <ul className="flex gap-5 items-center">
            <li className="text-sm ">
                <Link href="/">Features</Link>
            </li>
            <li className="text-sm ">
                <Link href="/about">Demo</Link>
            </li>
            <li className="text-sm ">
                <Link href="/contact">Pricing</Link>
            </li>
        </ul>

        <div className="flex gap-5 items-center">
            <button className="text-xl cursor-pointer">Login</button>
            <button className="bg-green-900 text-white p-2 rounded-lg cursor-pointer">Get Started</button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
