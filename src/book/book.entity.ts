import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  type Relation,
} from 'typeorm';
import { BorrowedRecord } from '../borrowed-record/borrowed-record.entity.js';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ unique: true })
  isbn: string;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => BorrowedRecord, (record) => record.book)
  borrowedRecords: Relation<BorrowedRecord[]>;
}
