"use client"
import { tools } from '@/constants/tools';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const HomePageContent = () => {
    const router = useRouter();

    return (
        <div>
            <div className="mb-8 space-y-4 ">
                <h2 className="text-2xl md:text-4xl font-bold text-center flex items-center justify-center text-sky-500">
                    Unleash Your Imagination with MARE
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    We offer you various image tools to simplify your daily life.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-20 lg:px-32">
                {tools.map((tool) => (
                    <div
                        onClick={() => router.push(tool.route)}
                        key={tool.route}
                        className="bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-xl cursor-pointer group"
                    >
                        <div className={`p-4 ${tool.bgColor}`}>
                            <Image
                                src={tool.icon}
                                height={28}
                                width={28}
                                className={`${tool.color}`}
                                alt={tool.label}
                            />
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-semibold text-xl mb-2 group-hover:text-sky-500">{tool.label}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default HomePageContent