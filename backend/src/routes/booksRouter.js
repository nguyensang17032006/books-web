import express from 'express'
import { getAllBooks, createBook, updateBook, deleteBook } from '../controllers/booksController.js';
const route = express();

route.get('/', (req, res) => {
    getAllBooks(req, res);
})
route.post('/', (req, res) => {
    createBook(req, res);
})
route.put('/:id', (req, res) => {
    updateBook(req, res);
})
route.delete('/:id', (req, res) => {
    deleteBook(req, res);
})

export default route
