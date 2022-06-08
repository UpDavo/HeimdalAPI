import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappApiLogicService } from './whatsapp-api-logic.service';

describe('WhatsappApiLogicService', () => {
  let service: WhatsappApiLogicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatsappApiLogicService],
    }).compile();

    service = module.get<WhatsappApiLogicService>(WhatsappApiLogicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
