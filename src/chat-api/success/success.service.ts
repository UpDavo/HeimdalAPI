import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { BASEURL } from 'src/common/api-resource';
import { firstValueFrom } from 'rxjs';
import { ChatAPIRequestTemplate } from '../chat-api-dto/chat-api-request-template';
import { ChatAPIResponseTemplate } from '../chat-api-dto/chat-api-response-template';

@Injectable()
export class SuccessService {
  constructor(private readonly httpService: HttpService) {}

  //TELEGRAM - ALERTS TO POCS
  async telegram_group_canceled_alert(clientData: any, chatId: any) {
    const request = {
      chat_id: chatId,
      text: `El pedido con número de orden ${clientData.idOrden} Ha sido cancelado`,
      parse_mode: 'markdown',
    };
    const data = await firstValueFrom(
      this.httpService.post(
        `${BASEURL.baseUrlTelegramAPI}/sendMessage`,
        request,
      ),
    );
    return data;
  }

  async telegram_group_success_poc_alert() {
    return 'data';
  }

  async telegram_group_success_admin_alert() {
    return 'data';
  }

  async telegram_group_success_payment_link_alert() {
    return 'data';
  }

  //CHATAPI - ALERTS TO CLIENTS

  async chat_api_individual_success_payment_link_alert() {
    return 'data';
  }

  //GENERAL
  async general_create_url_payphone() {
    return 'data';
  }

  async general_check_url_paymphone() {
    return 'data';
  }

  async general_create_user_data_by_vtex_id() {
    return 'data';
  }

  //Send Template to the client
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

  //send message to telegram
  async sendTelegramTemplate(
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
