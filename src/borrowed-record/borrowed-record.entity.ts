import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';

import { Book } from '../book/book.entity.js';
import { Reader } from '../reader/reader.entity.js';

@Entity()
export class BorrowedRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  borrowDate: Date;

  @Column({ type: 'datetime', nullable: true })
  dueDate: Date | null;

  @Column({ type: 'datetime', nullable: true })
  returnDate: Date | null;

  @ManyToOne(() => Book, (book) => book.borrowedRecords)
  @JoinColumn({ name: 'bookId' })
  book: Relation<Book>;

  @ManyToOne(() => Reader, (reader) => reader.borrowedRecords)
  @JoinColumn({ name: 'readerId' })
  reader: Relation<Reader>;
}
