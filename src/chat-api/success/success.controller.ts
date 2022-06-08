import { Controller, Post, HttpStatus, Param, Res, Body } from '@nestjs/common';
import { SuccessService } from './success.service';
import { Logger } from '@nestjs/common';
import { ChatAPIRequestTemplate } from '../chat-api-dto/chat-api-request-template';

@Controller('success')
export class SuccessController {
  private readonly logger = new Logger('chat-api-logic');
  constructor(private SuccessService: SuccessService) {}

  @Post()
  sendWhatsAppTemplate(
    @Body() request: ChatAPIRequestTemplate,
    @Res() response,
  ) {
    this.logger.warn('sendWhatsAppTemplate');
    this.SuccessService.sendWhatsAppTemplate(request)
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
