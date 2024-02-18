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
        <header className='header'>

            <Link href="/" className="sidebar-logo px-5">
                <Image src="/assets/images/logo-icon.svg" alt="logo" width={28} height={28} />
                <h1 className='font-bold text-sky-500 text-lg'>MARE</h1>
            </Link>
            <nav className="flex gap-2">
                <SignedIn>
                    <UserButton afterSignOutUrl='/' />
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src={"/assets/icons/menu.svg"}
                                alt='menu'
                                width={32}
                                height={32}
                                className='cursor-pointer'
                            />
                        </SheetTrigger>
                        <SheetContent className='sheet-content sm:w-64'>
                            <>
                                <div className="sidebar-logo px-5 cursor-pointer">
                                    <Image src="/assets/images/logo-icon.svg" alt="logo" width={28} height={28} />
                                    <h1 className='font-bold text-sky-500 text-lg'>MARE</h1>
                                </div>

                                <ul className="header-nav_elements">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname

                                        return (
                                            <li key={link.route}
                                                className={`${isActive && 'gradient-text'
                                                    } p-18 flex whitespace-nowrap text-dark-700`}>
                                                <Link className="sidebar-link cursor-pointer" href={link.route}>
                                                    <Image
                                                        src={link.icon}
                                                        alt="logo"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>


                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut>
            </nav>

        </header>
    )
}

export default MobileNav