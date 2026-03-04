import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.jsx"
import { Menu, ShoppingCartIcon, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export function NavigationMenuBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList className="flex justify-center gap-2 lg:gap-4 xl:gap-8">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent text-white text-base lg:text-xl hover:bg-blue-600 data-[state=open]:bg-blue-600">
                            All products
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-blue-600 rounded-md shadow-lg">
                            <ul className="grid w-[200px] lg:w-[250px] gap-2 p-3">
                                <ListItem title="Air Conditioner" href="/" />
                                <ListItem title="Kitchen Appliances" href="/" />
                                <ListItem title="PCs & Laptops" href="/" />
                                <ListItem title="Gadgets" href="/" />
                                <ListItem title="Smart Home" href="/" />
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationItem title="Home appliances" href="/home-appliances" />
                    <NavigationItem title="Audio & video" href="/audio-video" />
                    <NavigationItem title="Refrigerators" href="/refrigerators" />
                    <NavigationItem title="New arrivals" href="/new-arrivals" />
                    <NavigationItem title="Today's deals" href="/todays-deals" />
                </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-blue-600 rounded-md"
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg z-50">
                    <div className="flex flex-col p-4 space-y-3">
                        <MobileNavItem title="All Products" href="/all-products" hasSubmenu>
                            <div className="pl-4 space-y-2 mt-2">
                                <MobileNavItem title="Subitem 1" href="/" />
                                <MobileNavItem title="Subitem 2" href="/" />
                                <MobileNavItem title="Subitem 3" href="/" />
                            </div>
                        </MobileNavItem>
                        <MobileNavItem title="Home appliances" href="/home-appliances" />
                        <MobileNavItem title="Audio & video" href="/audio-video" />
                        <MobileNavItem title="Refrigerators" href="/refrigerators" />
                        <MobileNavItem title="New arrivals" href="/new-arrivals" />
                        <MobileNavItem title="Today's deals" href="/todays-deals" />

                    </div>
                </div>
            )}
        </>
    )
}

const ListItem = ({ title, href, children }) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    to={href}
                    className="block rounded-md p-2 hover:bg-blue-700 transition-colors"
                >
                    <div className="font-medium leading-none text-white">{title}</div>
                    {children && (
                        <p className="text-blue-100 text-xs mt-1">
                            {children}
                        </p>
                    )}
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

const NavigationItem = ({ title, href }) => {
    const isIcon = typeof title !== "string";
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link
                    to={href}
                    className={`
                        text-white font-semibold transition-all duration-200
                        rounded-md hover:bg-blue-600
                        flex items-center justify-center
                        ${isIcon ? "p-2 [&>svg]:w-6 [&>svg]:h-6 lg:[&>svg]:w-8 lg:[&>svg]:h-8" : "px-3 py-2 text-base lg:text-xl"}
                    `}
                >
                    {title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    )
}

const MobileNavItem = ({ title, href, children, hasSubmenu = false }) => {
    const [isOpen, setIsOpen] = useState(false)

    if (hasSubmenu) {
        return (
            <div className="flex flex-col">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between p-3 text-white hover:bg-blue-700 rounded-md transition-colors text-lg font-semibold"
                >
                    {title}
                    <span className="transform transition-transform">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && children}
            </div>
        )
    }

    return (
        <Link
            to={href}
            className="p-3 text-white hover:bg-blue-700 rounded-md transition-colors text-lg font-semibold"
            onClick={() => {
                const event = new CustomEvent('closemobilemenu')
                window.dispatchEvent(event)
            }}
        >
            {title}
        </Link>
    )
}