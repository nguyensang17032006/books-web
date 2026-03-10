import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BookTable() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/books");
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
                                    <button className="text-primary hover:underline text-sm">
                                        Edit
                                    </button>
                                    <button className="text-destructive hover:underline text-sm">
                                        Delete
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}