import { useEffect, useState } from "react";
import EditBookForm from "./EditBookForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
const API_URL = import.meta.env.VITE_API_URL;

export default function BookTable() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${API_URL}/api/books/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            // reload list
            fetchBooks();

        } catch (error) {
            console.error(error);
            alert("Error deleting book");
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await fetch(`${API_URL}/api/books`);
            const data = await res.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Loading books...
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Publish Date</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {books.map((book, idx) => (
                        <TableRow key={book._id}>
                            <TableCell>{idx + 1}</TableCell>

                            {/* Image */}
                            <TableCell>
                                {book.imageUrl ? (
                                    <img
                                        src={book.imageUrl}
                                        alt={book.title}
                                        className="w-16 h-24 object-cover rounded-md shadow-sm"
                                    />
                                ) : (
                                    <div className="w-16 h-24 bg-muted rounded-md" />
                                )}
                            </TableCell>

                            <TableCell className="font-medium">
                                {book.title}
                            </TableCell>

                            <TableCell>{book.author}</TableCell>

                            {/* Published Date */}
                            <TableCell>
                                {new Date(book.publishedDate).toLocaleDateString()}
                            </TableCell>

                            {/* Price */}
                            <TableCell>
                                <Badge variant="secondary">
                                    {Number(book.price).toLocaleString()} ₫
                                </Badge>
                            </TableCell>

                            {/* Quantity */}
                            <TableCell>{book.quantity}</TableCell>

                            <TableCell>
                                <div className="flex gap-2">
                                    <button className="text-primary hover:underline text-sm"
                                        onClick={() => {
                                            setSelectedBook(book);
                                            setOpen(true);
                                        }}>
                                        Edit
                                    </button>
                                    <button className="text-destructive hover:underline text-sm" onClick={() => handleDelete(book._id)}>
                                        Delete
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                    </DialogHeader>

                    <EditBookForm
                        book={selectedBook}
                        onSuccess={() => {
                            fetchBooks();
                            setOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}