import { Controller, Post, HttpStatus, Param, Res, Body } from '@nestjs/common';
import { TelegramApiLogicService } from './telegram-api-logic.service';
import { Logger } from '@nestjs/common';
import { TelegramAPIRequest } from '../telegram-dto/telegram-request';

@Controller('telegram-api-logic')
export class TelegramApiLogicController {
  private readonly logger = new Logger('vtex-notifications');
  constructor(private TelegramApiLogicService: TelegramApiLogicService) {}

  @Post()
  sendTelegramMessage(@Body() request: TelegramAPIRequest, @Res() response) {
    this.logger.warn('sendWhatsAppMessage');
    this.TelegramApiLogicService.sendTelegramMessage(request)
      .then((res) => {
        console.log(res.data);
        response.status(HttpStatus.CREATED).json(res.data);
      })
      .catch((err) => {
        console.log(err.data);
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }
}
