import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";

export default function Header() {
    return (
        <header className="bg-primary h-16 flex items-center px-6 shadow-md text-white sticky top-0 z-20">
            <div className="flex items-center gap-3 text-xl font-semibold">
                <BookOpen size={28} />
                <span>Book Haven</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
                <Input
                    type="search"
                    placeholder="Search books..."
                    className="bg-white/20 border-none text-white placeholder:text-white/70 focus-visible:ring-white/30 w-72 h-9"
                />
                <span className="text-sm">Admin • Sáng</span>
            </div>
        </header>
    );
}