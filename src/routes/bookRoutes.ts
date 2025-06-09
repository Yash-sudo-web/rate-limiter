import { Router } from 'express';
import { addBook, getAllBooks, getBookById } from '../controllers/bookController';

const router: Router = Router();

router.post('/books', addBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);

export default router;
