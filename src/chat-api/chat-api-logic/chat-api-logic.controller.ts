import { Controller, Post, HttpStatus, Param, Res, Body } from '@nestjs/common';
import { ChatApiLogicService } from './chat-api-logic.service';
import { Logger } from '@nestjs/common';
import { ChatAPIRequestTemplate } from '../chat-api-dto/chat-api-request-template';

@Controller('chat-api-logic')
export class ChatApiLogicController {
  private readonly logger = new Logger('chat-api-logic');
  constructor(private ChatApiLogicService: ChatApiLogicService) {}

  @Post()
  sendWhatsAppTemplate(
    @Body() request: ChatAPIRequestTemplate,
    @Res() response,
  ) {
    this.logger.warn('sendWhatsAppTemplate');
    this.ChatApiLogicService.sendWhatsAppTemplate(request)
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
