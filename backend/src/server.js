import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import booksRouter from './routes/booksRouter.js'
import { connectDB } from './config/db.js'
const app = express()

app.use(express.json());
app.use('/api/books', booksRouter);

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
}).catch((error) => {
    console.error("Failed to start server:", error);
});