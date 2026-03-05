import { BookOpen, PlusCircle, Tags, User, ShoppingCart, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
    { to: "/", label: "All Books", icon: BookOpen },
    { to: "/add", label: "Add New Book", icon: PlusCircle },
    { to: "/categories", label: "Categories", icon: Tags },
    { to: "/authors", label: "Authors", icon: User },
    { to: "/orders", label: "Orders", icon: ShoppingCart },
    { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="w-60 bg-white border-r border-border overflow-y-auto">
            <nav className="py-6">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-6 py-3 text-sm transition-colors border-l-4",
                                        isActive
                                            ? "border-primary bg-accent text-primary font-medium"
                                            : "border-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )
                                }
                            >
                                <item.icon size={18} />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}