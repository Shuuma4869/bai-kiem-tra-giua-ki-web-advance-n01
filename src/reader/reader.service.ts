import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateReaderDto, UpdateReaderDto } from './reader.dto.js';
import { Reader } from './reader.entity.js';

@Injectable()
export class ReaderService {
  constructor(
    @InjectRepository(Reader)
    private readonly readerRepository: Repository<Reader>,
  ) {}

  async create(createReaderDto: CreateReaderDto): Promise<Reader> {
    const emailExists = await this.readerRepository.exists({
      where: { email: createReaderDto.email },
    });

    if (emailExists) {
      throw new ConflictException('Email đã tồn tại');
    }

    const reader = this.readerRepository.create(createReaderDto);
    return this.readerRepository.save(reader);
  }

  findAll(): Promise<Reader[]> {
    return this.readerRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Reader> {
    const reader = await this.readerRepository.findOne({ where: { id } });

    if (!reader) {
      throw new NotFoundException(`Không tìm thấy độc giả có id ${id}`);
    }

    return reader;
  }

  async update(id: number, updateReaderDto: UpdateReaderDto): Promise<Reader> {
    if (updateReaderDto.email) {
      const emailExists = await this.readerRepository.exists({
        where: { email: updateReaderDto.email, id: Not(id) },
      });

      if (emailExists) {
        throw new ConflictException('Email đã tồn tại');
      }
    }

    const reader = await this.readerRepository.preload({
      id,
      ...updateReaderDto,
    });

    if (!reader) {
      throw new NotFoundException(`Không tìm thấy độc giả có id ${id}`);
    }

    return this.readerRepository.save(reader);
  }

  async remove(id: number): Promise<void> {
    const reader = await this.findOne(id);
    await this.readerRepository.remove(reader);
  }
}
