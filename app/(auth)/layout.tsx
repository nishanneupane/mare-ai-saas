import React from 'react'
import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-600 to-indigo-800 p-6'>
            <div className='max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 backdrop-blur-sm bg-white/10 rounded-2xl p-8 shadow-2xl'>
                <div className='flex-1 text-center md:text-left'>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                        Welcome to <span className='inline-block bg-white text-sky-600 px-4 py-2 rounded-lg transform -skew-x-6 shadow-lg'>MARE</span>
                    </h1>
                    <p className='text-sky-100 text-lg md:text-xl max-w-xl leading-relaxed'>
                        Unleash your creativity with our cutting-edge image tools. Experience seamless transformations and push the boundaries of visual innovation.
                    </p>
                </div>
                <div className='flex-1 w-full max-w-md'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout