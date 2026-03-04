import React, { useState } from 'react'
import { NavigationMenuBar } from './NavigationMenu.jsx'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, User, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-40">
            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-2xl">E</span>
                            </div>
                            <span className="text-white font-bold text-2xl hidden sm:block">ElectroShop</span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for products, brands, and more..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition" >
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-4">
                        <Link to="/wishlist" className="hidden sm:block">
                            <div className="flex flex-col items-center text-white hover:text-blue-200 transition">
                                <Heart size={24} />
                                <span className="text-xs mt-1">Wishlist</span>
                            </div>
                        </Link>

                        <Link to="/cart" className="relative">
                            <div className="flex flex-col items-center text-white hover:text-blue-200 transition">
                                <div className="relative">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        3
                                    </span>
                                </div>
                                <span className="text-xs mt-1 hidden sm:block">Cart</span>
                            </div>
                        </Link>

                        <Link to="/account" className="hidden md:block">
                            <div className="flex flex-col items-center text-white hover:text-blue-200 transition">
                                <User size={24} />
                                <span className="text-xs mt-1">Account</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-blue-700">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center">
                        <NavigationMenuBar />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header