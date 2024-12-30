import { randomUUID } from 'crypto';

import { Injectable, NotFoundException } from '@nestjs/common';

import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  getAll(): Book[] {
    return this.books;
  }

  getOne(id: string): Book {
    const book = this.books.find((item) => item.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  create(createBookDto: CreateBookDto): Book {
    const id = randomUUID();
    const newBook = {
      id,
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: string, updateBookDto: UpdateBookDto): Book {
    const i = this.books.findIndex((item) => item.id === id);
    if (i < 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    const updatedBook = {
      ...this.books[i],
      ...updateBookDto,
    };
    this.books[i] = updatedBook;
    return updatedBook;
  }

  delete(id: string): Book {
    const i = this.books.findIndex((item) => item.id === id);
    if (i < 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    const deletedBook = this.books.splice(i, 1)[0];
    return deletedBook;
  }
}
