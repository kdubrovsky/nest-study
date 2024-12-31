import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';

import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(@Query() query: SearchBookDto) {
    return this.booksService.getAll(query);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.booksService.getOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.booksService.delete(id);
  }
}
