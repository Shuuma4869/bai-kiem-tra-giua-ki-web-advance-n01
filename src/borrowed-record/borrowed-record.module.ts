import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowedRecordController } from './borrowed-record.controller.js';
import { BorrowedRecord } from './borrowed-record.entity.js';
import { BorrowedRecordService } from './borrowed-record.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedRecord])],
  controllers: [BorrowedRecordController],
  providers: [BorrowedRecordService],
})
export class BorrowedRecordModule {}
