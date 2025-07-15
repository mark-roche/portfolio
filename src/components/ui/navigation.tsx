"use client";
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { ThemeSwitcher } from './theme-switcher';
import { useTheme } from './theme-provider';
import Link from 'next/link';

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <ThemeSwitcher
                            value={theme}
                            onChange={setTheme}
                            className="bg-gray-100 dark:bg-slate-800"
                        />
                        <Link href="/" className="text-xl font-semibold">Mark Roche</Link>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">About</Link>
                        <Link href="/#work" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Experience</Link>
                        <Link href="/#skills" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Skills</Link>
                        <Link href="/toolkit" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Toolkit</Link>
                        <Link href="/#contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="hidden md:block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Contact Me
                        </button>
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 py-4">
                    <div className="container mx-auto px-4 space-y-4">
                        <Link href="/#about" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">About</Link>
                        <Link href="/#work" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Experience</Link>
                        <Link href="/#skills" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Skills</Link>
                        <Link href="/toolkit" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Toolkit</Link>
                        <Link href="/#contact" className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact</Link>
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Contact Me
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
} 