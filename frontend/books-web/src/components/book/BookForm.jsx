import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const API_URL = import.meta.env.VITE_API_URL;

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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.jsx";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    price: z.coerce.number().min(0),
    quantity: z.coerce.number().min(0),
    publishedDate: z.string().min(1, "Published date is required"),
});

export default function BookForm() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            author: "",
            price: 0,
            quantity: 0,
            publishedDate: "",
        },
    });

    // Preview ảnh
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

    // Submit form
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

            const res = await fetch(`${API_URL}/api/books`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Error creating book");
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Book</CardTitle>
                <CardDescription>Fill in the details below.</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Title */}
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

                        {/* Author */}
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Published Date */}
                        <FormField
                            control={form.control}
                            name="publishedDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Published Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (VND)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Quantity */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image */}
                        <div className="space-y-2">
                            <FormLabel>Cover Image</FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                name="image"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />

                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-h-64 object-contain rounded-lg border mx-auto shadow-sm"
                                />
                            )}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="submit">Add Book</Button>
                            <Button variant="outline" type="button" onClick={() => navigate("/")}>
                                Cancel
                            </Button>
                        </div>

                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}