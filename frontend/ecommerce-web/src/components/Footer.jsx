import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">ElectroShop</h3>
                        <p className="text-gray-400">
                            Your one-stop shop for all electronic needs. Quality products at affordable prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-gray-400 hover:text-white transition">About Us</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                            <li><a href="/faq" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                            <li><a href="/shipping" className="text-gray-400 hover:text-white transition">Shipping Policy</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li><a href="/category/smartphones" className="text-gray-400 hover:text-white transition">Smartphones</a></li>
                            <li><a href="/category/laptops" className="text-gray-400 hover:text-white transition">Laptops</a></li>
                            <li><a href="/category/tv" className="text-gray-400 hover:text-white transition">TV & Audio</a></li>
                            <li><a href="/category/home" className="text-gray-400 hover:text-white transition">Home Appliances</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">123 Fifth Avenue, New York, NY 10160</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">contact@info.com</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">929-242-6868</a></li>
                        </ul>

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} ElectroShop. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer
