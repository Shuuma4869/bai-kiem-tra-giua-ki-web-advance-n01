import { Test, TestingModule } from '@nestjs/testing';
import { ReaderController } from './reader.controller.js';
import { ReaderService } from './reader.service.js';

describe('ReaderController', () => {
  let controller: ReaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReaderController],
      providers: [
        {
          provide: ReaderService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ReaderController>(ReaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
