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
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-xl transition-all duration-300 ease-in-out z-50">
      <div className="flex h-full flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center justify-center space-x-2 py-6">
            <Image src="/assets/images/logo-icon.svg" alt="logo" width={40} height={40} className="rounded-full bg-white p-1.5" />
            <h1 className='text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200'>MARE</h1>
          </Link>

          <nav className="px-4">
            <SignedIn>
              <ul className="space-y-2">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname

                  return (
                    <li key={link.route}>
                      <Link
                        href={link.route}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 transition-all duration-200",
                          isActive ? "bg-white bg-opacity-20 text-white shadow-md" : "text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white hover:shadow-sm"
                        )}
                      >
                        <Hint label={link.label} side='right'>
                          <div className={cn("p-1.5 rounded-md transition-all duration-200", isActive ? "bg-white bg-opacity-30" : "bg-transparent")}>
                            <Image
                              src={link.icon}
                              alt={link.label}
                              width={20}
                              height={20}
                              className={cn("transition-all duration-200 fill-white text-white", isActive && 'scale-110')}
                              style={{ filter: 'brightness(0) invert(1)' }}
                            />
                          </div>
                        </Hint>
                        <span className="text-xs font-medium">{link.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </SignedIn>
            <SignedOut>
              <div className="space-y-4 mt-8">
                <h2 className="text-xl font-bold text-center">Welcome to MARE</h2>
                <p className="text-xs text-center px-2">Unleash your creativity with our powerful image tools.</p>
                <ul className="space-y-2">
                  {navLinks.slice(0, 3).map((link) => (
                    <li key={link.route}>
                      <div className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-300 bg-white bg-opacity-5">
                        <div className="p-1.5 rounded-md bg-white bg-opacity-10">
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={20}
                            height={20}
                          />
                        </div>
                        <span className="text-xs font-medium">{link.label}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-center italic text-gray-300">Sign in to access all features</p>
              </div>
            </SignedOut>
          </nav>
        </div>

        <div className="px-4 pb-6">
          <SignedIn>
            <div className="flex items-center justify-between rounded-lg bg-white bg-opacity-10 p-3 hover:bg-opacity-20 transition-all duration-200">
              <UserButton afterSignOutUrl='/' />
              <span className="text-xs font-medium">My Account</span>
            </div>
          </SignedIn>

          <SignedOut>
            <Button asChild className="w-full bg-white text-purple-700 hover:bg-purple-600 rounded-lg py-2 text-sm font-semibold transition-all duration-200 hover:shadow-md">
              <Link href="/sign-in">Login to Get Started</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar