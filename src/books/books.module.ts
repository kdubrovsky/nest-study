import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [TypeOrmModule.forFeature([Book])],
})
export class BooksModule {}
