import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappApiLogicController } from './whatsapp-api-logic.controller';

describe('WhatsappApiLogicController', () => {
  let controller: WhatsappApiLogicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatsappApiLogicController],
    }).compile();

    controller = module.get<WhatsappApiLogicController>(WhatsappApiLogicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
