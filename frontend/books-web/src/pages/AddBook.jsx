import BookForm from "@/components/book/BookForm";

export default function AddBook() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Add New Book</h1>
            <BookForm />
        </div>
    );
}