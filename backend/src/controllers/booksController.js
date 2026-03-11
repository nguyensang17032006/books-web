import Book from "../models/books.js"
import cloudinary from "../config/cloudinary.js";
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Failed to fetch books" });
    }
}

const createBook = async (req, res) => {
    try {
        const {
            title,
            author,
            publishedDate,
            categories,
            price,
            quantity,
        } = req.body;

        let imageUrl = "";
        let imagePublicId = "";

        if (req.file) {
            imageUrl = req.file.path;
            imagePublicId = req.file.filename; // Cloudinary public_id
        }

        const newBook = new Book({
            title,
            author,
            publishedDate,
            categories,
            price,
            quantity,
            imageUrl,
            imagePublicId
        });

        const savedBook = await newBook.save();

        res.status(201).json(savedBook);

    } catch (error) {
        console.error("Error creating book:", error);
        res.status(400).json({ message: "Failed to create book" });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = {
            ...req.body,
            price: Number(req.body.price),
            quantity: Number(req.body.quantity),
            publishedDate: new Date(req.body.publishedDate),
        };

        if (req.file) {
            updateData.imageUrl = req.file.path;
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);

    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(400).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Xóa ảnh trên Cloudinary
        if (book.imagePublicId) {
            await cloudinary.uploader.destroy(book.imagePublicId);
        }

        await Book.findByIdAndDelete(id);

        res.status(200).json({
            message: "Book deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({
            message: "Failed to delete book"
        });
    }
};

export { getAllBooks, createBook, updateBook, deleteBook }