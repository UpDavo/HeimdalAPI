import { Module } from '@nestjs/common';
import { ChatApiLogicController } from './chat-api-logic/chat-api-logic.controller';
import { ChatApiLogicService } from './chat-api-logic/chat-api-logic.service';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/httpService.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    ChatApiModule,
  ],
  controllers: [ChatApiLogicController],
  providers: [ChatApiLogicService],
})
export class ChatApiModule {}
