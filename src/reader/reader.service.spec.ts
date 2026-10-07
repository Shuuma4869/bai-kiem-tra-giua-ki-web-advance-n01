import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reader } from './reader.entity.js';
import { ReaderService } from './reader.service.js';

describe('ReaderService', () => {
  let service: ReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReaderService,
        {
          provide: getRepositoryToken(Reader),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ReaderService>(ReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
