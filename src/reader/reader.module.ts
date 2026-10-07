import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReaderController } from './reader.controller.js';
import { Reader } from './reader.entity.js';
import { ReaderService } from './reader.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Reader])],
  controllers: [ReaderController],
  providers: [ReaderService],
})
export class ReaderModule {}
