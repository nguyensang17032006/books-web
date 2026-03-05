import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookTable from "@/components/book/BookTable";

export default function Home() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Book List</h1>
                <Button asChild>
                    <a href="/add" className="flex items-center gap-2">
                        <Plus size={16} />
                        Add New Book
                    </a>
                </Button>
            </div>

            <BookTable />
        </div>
    );
}