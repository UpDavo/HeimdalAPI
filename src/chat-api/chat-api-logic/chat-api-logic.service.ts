import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { BASEURL } from 'src/common/api-resource';
import { firstValueFrom } from 'rxjs';
import { ChatAPIRequestTemplate } from '../chat-api-dto/chat-api-request-template';
import { ChatAPIResponseTemplate } from '../chat-api-dto/chat-api-response-template';

@Injectable()
export class ChatApiLogicService {
  constructor(private readonly httpService: HttpService) {}

  async sendWhatsAppTemplate(
    request: ChatAPIRequestTemplate,
  ): Promise<AxiosResponse<ChatAPIResponseTemplate>> {
    const data = await firstValueFrom(
      this.httpService.post(
        `${BASEURL.baseUrlChatAPI}/sendTemplate?token=w4zuj9n7xpucl3hk`,
        request,
      ),
    );
    return data;
  }
}
