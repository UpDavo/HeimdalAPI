import { Module } from '@nestjs/common';
import { TelegramApiLogicService } from './telegram-api-logic/telegram-api-logic.service';
import { TelegramApiLogicController } from './telegram-api-logic/telegram-api-logic.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/httpService.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    TelegramApiModule,
  ],
  providers: [TelegramApiLogicService],
  controllers: [TelegramApiLogicController],
})
export class TelegramApiModule {}
