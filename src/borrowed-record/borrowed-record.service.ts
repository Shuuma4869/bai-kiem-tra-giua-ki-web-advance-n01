import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { Book } from '../book/book.entity.js';
import { Reader } from '../reader/reader.entity.js';
import { BorrowBookDto } from './borrowed-record.dto.js';
import { BorrowedRecord } from './borrowed-record.entity.js';

const DEFAULT_LOAN_DAYS = 14;

export interface BorrowedBookInfo {
  borrowedRecordId: number;
  book: {
    id: number;
    title: string;
    author: string;
    isbn: string;
  };
  borrower: {
    id: number;
    name: string;
    email: string;
  };
  borrowDate: Date;
  dueDate: Date;
}

@Injectable()
export class BorrowedRecordService {
  constructor(
    @InjectRepository(BorrowedRecord)
    private readonly borrowedRecordRepository: Repository<BorrowedRecord>,
    private readonly dataSource: DataSource,
  ) {}

  borrow(borrowBookDto: BorrowBookDto): Promise<BorrowedRecord> {
    const borrowDate = borrowBookDto.borrowDate
      ? new Date(borrowBookDto.borrowDate)
      : new Date();
    const dueDate = borrowBookDto.dueDate
      ? new Date(borrowBookDto.dueDate)
      : new Date(
          borrowDate.getTime() + DEFAULT_LOAN_DAYS * 24 * 60 * 60 * 1000,
        );

    if (dueDate <= borrowDate) {
      throw new BadRequestException('Hạn trả phải sau ngày mượn');
    }

    return this.dataSource.transaction(async (manager) => {
      const bookRepository = manager.getRepository(Book);
      const readerRepository = manager.getRepository(Reader);
      const recordRepository = manager.getRepository(BorrowedRecord);

      const [book, reader] = await Promise.all([
        bookRepository.findOne({ where: { id: borrowBookDto.bookId } }),
        readerRepository.findOne({ where: { id: borrowBookDto.readerId } }),
      ]);

      if (!book) {
        throw new NotFoundException(
          `Không tìm thấy sách có id ${borrowBookDto.bookId}`,
        );
      }

      if (!reader) {
        throw new NotFoundException(
          `Không tìm thấy độc giả có id ${borrowBookDto.readerId}`,
        );
      }

      if (!book.isAvailable) {
        throw new ConflictException('Sách hiện không có sẵn để mượn');
      }

      const updateResult = await bookRepository.update(
        { id: book.id, isAvailable: true },
        { isAvailable: false },
      );

      if (updateResult.affected !== 1) {
        throw new ConflictException('Sách vừa được một độc giả khác mượn');
      }

      book.isAvailable = false;

      const borrowedRecord = recordRepository.create({
        book,
        reader,
        borrowDate,
        dueDate,
      });

      return recordRepository.save(borrowedRecord);
    });
  }

  findAll(): Promise<BorrowedRecord[]> {
    return this.borrowedRecordRepository.find({
      relations: { book: true, reader: true },
      order: { id: 'ASC' },
    });
  }

  async findBorrowedBooks(): Promise<BorrowedBookInfo[]> {
    const borrowedRecords = await this.borrowedRecordRepository.find({
      where: { returnDate: IsNull() },
      relations: { book: true, reader: true },
      order: { borrowDate: 'DESC' },
    });

    return borrowedRecords.map((record) => ({
      borrowedRecordId: record.id,
      book: {
        id: record.book.id,
        title: record.book.title,
        author: record.book.author,
        isbn: record.book.isbn,
      },
      borrower: {
        id: record.reader.id,
        name: record.reader.name,
        email: record.reader.email,
      },
      borrowDate: record.borrowDate,
      dueDate:
        record.dueDate ??
        new Date(
          record.borrowDate.getTime() +
            DEFAULT_LOAN_DAYS * 24 * 60 * 60 * 1000,
        ),
    }));
  }

  async findOne(id: number): Promise<BorrowedRecord> {
    const borrowedRecord = await this.borrowedRecordRepository.findOne({
      where: { id },
      relations: { book: true, reader: true },
    });

    if (!borrowedRecord) {
      throw new NotFoundException(`Không tìm thấy phiếu mượn có id ${id}`);
    }

    return borrowedRecord;
  }
}
