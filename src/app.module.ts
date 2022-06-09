import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatApiModule } from './chat-api/chat-api.module';

@Module({
  imports: [ChatApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
