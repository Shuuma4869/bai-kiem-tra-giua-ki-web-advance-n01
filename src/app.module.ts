import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BookModule } from './book/book.module.js';
import { ReaderModule } from './reader/reader.module.js';
import { BorrowedRecordModule } from './borrowed-record/borrowed-record.module.js';
import { Book } from './book/book.entity.js';
import { Reader } from './reader/reader.entity.js';
import { BorrowedRecord } from './borrowed-record/borrowed-record.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH ?? 'library.sqlite',
      entities: [Book, Reader, BorrowedRecord],
      synchronize: true,
    }),

    BookModule,
    ReaderModule,
    BorrowedRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
