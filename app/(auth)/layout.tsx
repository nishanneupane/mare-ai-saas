import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full flex items-center justify-center bg-sky-600 gap-5'>
            <div className='flex items-center justify-center flex-col'>
                <h1 className={" text-start font-bold text-5xl flex items-center gap-3 text-white"}>
                    Welcome to
                    <span className='text-sky-500 bg-white rounded-md px-5 py-2'>MARE</span>
                </h1>
                <p className='text-white font-medium max-w-[430px]'>
                    We offer you variety of images regarding features with seamless user experiences and more on.
                </p>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout