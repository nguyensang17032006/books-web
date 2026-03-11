import express from 'express'
import { getAllBooks, createBook, updateBook, deleteBook } from '../controllers/booksController.js';
import upload from '../config/upload.js';
const route = express();

route.get('/', (req, res) => {
    getAllBooks(req, res);
})
route.post('/', upload.single('image'), (req, res) => {
    createBook(req, res);
})
route.put('/:id', upload.single('image'), (req, res) => {
    updateBook(req, res);
})
route.delete('/:id', (req, res) => {
    deleteBook(req, res);
})

export default route
