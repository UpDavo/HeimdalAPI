import { Module } from '@nestjs/common';
import { SuccessController } from './success/success.controller';
import { SuccessService } from './success/success.service';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/httpService.config';
import { CanceledController } from './canceled/canceled.controller';
import { CanceledService } from './canceled/canceled.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    ChatApiModule,
  ],
  controllers: [SuccessController, CanceledController],
  providers: [SuccessService, CanceledService],
})
export class ChatApiModule {}
