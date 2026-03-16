import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button.jsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";

const schema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    price: z.coerce.number().min(0),
    quantity: z.coerce.number().min(0),
    publishedDate: z.string().min(1),
});

export default function EditBookForm({ book, onSuccess }) {
    const fileInputRef = useRef(null);

    const [imagePreview, setImagePreview] = useState(book?.imageUrl || null);
    const [selectedFile, setSelectedFile] = useState(null);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: book?.title || "",
            author: book?.author || "",
            price: book?.price || 0,
            quantity: book?.quantity || 0,
            publishedDate: book?.publishedDate
                ? book.publishedDate.substring(0, 10)
                : "",
        },
    });

    useEffect(() => {
        if (book) {
            form.reset({
                title: book.title,
                author: book.author,
                price: book.price,
                quantity: book.quantity,
                publishedDate: book.publishedDate?.substring(0, 10),
            });

            setImagePreview(book.imageUrl || null);
        }
    }, [book]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowed = ["image/jpeg", "image/png"];

        if (!allowed.includes(file.type)) {
            alert("Only JPG and PNG images allowed");
            return;
        }

        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("author", data.author);
            formData.append("price", data.price);
            formData.append("quantity", data.quantity);
            formData.append("publishedDate", data.publishedDate);

            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const res = await fetch(`/api/books/${book._id}`, {
                method: "PUT",
                body: formData,
            });

            if (!res.ok) throw new Error("Update failed");

            onSuccess();
        } catch (error) {
            console.error(error);
            alert("Error updating book");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="publishedDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Published Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="space-y-2">
                    <FormLabel>Cover Image</FormLabel>
                    <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-40 object-contain rounded border mx-auto"
                        />
                    )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="submit">Save</Button>
                </div>

            </form>
        </Form>
    );
}