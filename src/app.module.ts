import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatApiModule } from './chat-api/chat-api.module';
import { TelegramApiModule } from './telegram-api/telegram-api.module';
import { WhatsappApiModule } from './whatsapp-api/whatsapp-api.module';

@Module({
  imports: [ChatApiModule, TelegramApiModule, WhatsappApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
