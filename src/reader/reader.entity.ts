import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    type Relation,
} from 'typeorm';
import { BorrowedRecord } from '../borrowed-record/borrowed-record.entity.js';

@Entity()
export class Reader {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => BorrowedRecord, (record) => record.reader)
    borrowedRecords: Relation<BorrowedRecord[]>;
}
