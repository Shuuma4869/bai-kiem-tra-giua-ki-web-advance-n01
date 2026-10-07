import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BorrowBookDto } from './borrowed-record.dto.js';
import { BorrowedRecordService } from './borrowed-record.service.js';

@Controller('borrowed-record')
export class BorrowedRecordController {
  constructor(
    private readonly borrowedRecordService: BorrowedRecordService,
  ) {}

  @Post()
  borrow(@Body() borrowBookDto: BorrowBookDto) {
    return this.borrowedRecordService.borrow(borrowBookDto);
  }

  @Get()
  findAll() {
    return this.borrowedRecordService.findAll();
  }

  @Get('borrowed-books')
  findBorrowedBooks() {
    return this.borrowedRecordService.findBorrowedBooks();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.borrowedRecordService.findOne(id);
  }
}
