import { Request, Response } from 'express';
import {Book,  IBook } from '../models/Book';

export const addBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author } = req.body;

  if (!title || !author) {
    res.status(400).json({ message: 'Title and author are required' });
    return;
  }

  try {
    const newBook: IBook = new Book({ title, author });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
};

export const getAllBooks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};
