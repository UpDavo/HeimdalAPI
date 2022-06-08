import { Module } from '@nestjs/common';
import { WhatsappApiLogicController } from './whatsapp-api-logic/whatsapp-api-logic.controller';
import { WhatsappApiLogicService } from './whatsapp-api-logic/whatsapp-api-logic.service';

@Module({
  controllers: [WhatsappApiLogicController],
  providers: [WhatsappApiLogicService]
})
export class WhatsappApiModule {}
