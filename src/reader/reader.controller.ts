import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReaderDto, UpdateReaderDto } from './reader.dto.js';
import { ReaderService } from './reader.service.js';

@Controller('reader')
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Post()
  create(@Body() createReaderDto: CreateReaderDto) {
    return this.readerService.create(createReaderDto);
  }

  @Get()
  findAll() {
    return this.readerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.readerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReaderDto: UpdateReaderDto,
  ) {
    return this.readerService.update(id, updateReaderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.readerService.remove(id);
  }
}
