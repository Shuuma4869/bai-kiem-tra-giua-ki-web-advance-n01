import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './book.dto.js';
import { Book } from './book.entity.js';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const isbnExists = await this.bookRepository.exists({
      where: { isbn: createBookDto.isbn },
    });

    if (isbnExists) {
      throw new ConflictException('ISBN đã tồn tại');
    }

    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Không tìm thấy sách có id ${id}`);
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    if (updateBookDto.isbn) {
      const isbnExists = await this.bookRepository.exists({
        where: { isbn: updateBookDto.isbn, id: Not(id) },
      });

      if (isbnExists) {
        throw new ConflictException('ISBN đã tồn tại');
      }
    }

    const book = await this.bookRepository.preload({ id, ...updateBookDto });

    if (!book) {
      throw new NotFoundException(`Không tìm thấy sách có id ${id}`);
    }

    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }
}
