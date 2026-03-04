import Book from "../models/books.js"

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
            ImageUrl
        } = req.body;

        const newBook = new Book({
            title,
            author,
            publishedDate,
            categories,
            price,
            quantity,
            ImageUrl
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

        const {
            title,
            author,
            categories,
            price,
            quantity,
            ImageUrl
        } = req.body;

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (author !== undefined) updateData.author = author;
        if (categories !== undefined) updateData.categories = categories;
        if (price !== undefined) updateData.price = price;
        if (quantity !== undefined) {
            updateData.quantity = quantity;
            updateData.inStock = quantity > 0; // tự cập nhật
        }
        if (ImageUrl !== undefined) updateData.ImageUrl = ImageUrl;

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
        console.error("Error updating book:", error);
        res.status(400).json({ message: "Failed to update book" });
    }
};
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully",
            deletedBook
        });

    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({
            message: "Failed to delete book"
        });
    }
};

export { getAllBooks, createBook, updateBook, deleteBook }