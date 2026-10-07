import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BorrowedRecord } from './borrowed-record.entity.js';
import { BorrowedRecordService } from './borrowed-record.service.js';

describe('BorrowedRecordService', () => {
  let service: BorrowedRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowedRecordService,
        {
          provide: getRepositoryToken(BorrowedRecord),
          useValue: {},
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BorrowedRecordService>(BorrowedRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
