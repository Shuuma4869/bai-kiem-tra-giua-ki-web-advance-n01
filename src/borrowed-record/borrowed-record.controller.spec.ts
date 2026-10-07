import { Test, TestingModule } from '@nestjs/testing';
import { BorrowedRecordController } from './borrowed-record.controller.js';
import { BorrowedRecordService } from './borrowed-record.service.js';

describe('BorrowedRecordController', () => {
  let controller: BorrowedRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowedRecordController],
      providers: [
        {
          provide: BorrowedRecordService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BorrowedRecordController>(BorrowedRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
