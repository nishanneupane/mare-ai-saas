"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Hint from '../hint'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar h-full overflow-y-scroll no-scrollbar bg-white w-22 items-center justify-center">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo px-5">
          <Image src="/assets/images/logo-icon.svg" alt="logo" width={28} height={28} />
          <h1 className='font-bold text-sky-500'>MARE</h1>
        </Link>

        <nav className="sidebar-nav flex items-center justify-center">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white relative' : 'text-gray-700'
                    }`}>
                    <Link className="sidebar-link" href={link.route}>
                      <Hint label={link.label} side='right'>
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={28}
                          height={28}
                          className={`${isActive && 'brightness-200'} ms-5`}
                        />
                      </Hint>
                    </Link>
                    <div className={cn('', isActive && 'absolute right-0 top-0 w-1 h-full bg-sky-600')} />
                  </li>
                )
              })}
            </ul>


            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                    }`}>
                    <Link className="sidebar-link" href={link.route}>
                      <Hint label={link.label} side='right'>
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={28}
                          height={28}
                          className={`${isActive && 'brightness-200'} ms-5`}
                        />
                      </Hint>
                    </Link>
                  </li>
                )
              })}

              <li className="flex-center cursor-pointer gap-2 p-4 ms-5">
                <UserButton afterSignOutUrl='/' />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>

        </nav>
      </div>
    </aside>
  )
}

export default Sidebar