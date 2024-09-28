"use client"
import { tools } from '@/constants/tools';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const HomePageContent = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-4">
                    Unleash Your Imagination with MARE
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Elevate your visual content with our cutting-edge image tools designed to simplify and enhance your creative process.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool) => (
                    <div
                        key={tool.route}
                        onClick={() => router.push(tool.route)}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    >
                        <div className={`p-6 ${tool.bgColor} flex items-center justify-between`}>
                            <Image
                                src={tool.icon}
                                height={40}
                                width={40}
                                className={`${tool.color}`}
                                alt={tool.label}
                            />
                            <span className={`text-sm font-semibold ${tool.color}`}>{tool.label}</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{tool.label}</h3>
                            <p className="text-gray-600 dark:text-gray-300">Enhance your images with our advanced {tool.label.toLowerCase()} technology.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePageContent