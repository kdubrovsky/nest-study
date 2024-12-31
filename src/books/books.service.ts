import { randomUUID } from 'crypto';

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getAll(query: SearchBookDto): Promise<Book[]> {
    const { text, yearFrom, yearTo, sortBy } = query;

    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    // Добавляем условия, если они есть
    if (text) {
      queryBuilder.where('LOWER(book.title) LIKE LOWER(:text)', {
        text: `%${text}%`,
      });
    }

    if (yearFrom) {
      queryBuilder.andWhere('book.year >= :yearFrom', { yearFrom });
    }

    if (yearTo) {
      queryBuilder.andWhere('book.year <= :yearTo', { yearTo });
    }

    // Добавляем сортировку
    if (sortBy) {
      const order = sortBy.toUpperCase() as 'ASC' | 'DESC';
      queryBuilder.orderBy('book.year', order);
    }

    return queryBuilder.getMany();
  }

  async getOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(createBookDto);
    await this.bookRepository.save(newBook);
    return newBook;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const updatedBook = {
      ...book,
      ...updateBookDto,
    };
    return this.bookRepository.save(updatedBook);
  }

  async delete(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.bookRepository.remove(book);
  }
}
