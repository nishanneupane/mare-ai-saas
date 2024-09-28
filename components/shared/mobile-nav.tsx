"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const MobileNav = () => {
    const pathname = usePathname()
    return (
        <header className='flex justify-between items-center px-4 py-3 bg-white shadow-sm'>
            <Link href="/" className="flex items-center space-x-2">
                <Image src="/assets/images/logo-icon.svg" alt="logo" width={32} height={32} />
                <h1 className='font-bold text-sky-600 text-xl'>MARE</h1>
            </Link>
            <nav>
                <SignedIn>
                    <div className="flex items-center space-x-4">
                        <UserButton afterSignOutUrl='/' />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Image
                                        src={"/assets/icons/menu.svg"}
                                        alt='menu'
                                        width={24}
                                        height={24}
                                    />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className='p-0'>
                                <div className="flex flex-col h-full">
                                    <div className="p-4 border-b">
                                        <Link href="/" className="flex items-center space-x-2">
                                            <Image src="/assets/images/logo-icon.svg" alt="logo" width={32} height={32} />
                                            <h1 className='font-bold text-sky-600 text-xl'>MARE</h1>
                                        </Link>
                                    </div>
                                    <nav className="flex-grow py-4">
                                        <ul className="space-y-2">
                                            {navLinks.map((link) => {
                                                const isActive = link.route === pathname
                                                return (
                                                    <li key={link.route}>
                                                        <Link 
                                                            href={link.route}
                                                            className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium transition-colors
                                                                ${isActive 
                                                                    ? 'bg-sky-100 text-sky-700' 
                                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                                }`}
                                                        >
                                                            <Image
                                                                src={link.icon}
                                                                alt={link.label}
                                                                width={20}
                                                                height={20}
                                                            />
                                                            <span>{link.label}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut>
            </nav>
        </header>
    )
}

export default MobileNav