import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { BASEURL } from 'src/common/api-resource';
import { firstValueFrom } from 'rxjs';
import { TelegramAPIRequest } from '../telegram-dto/telegram-request';
import { TelegramAPIResponse } from '../telegram-dto/telegram-response';

@Injectable()
export class TelegramApiLogicService {
  constructor(private readonly httpService: HttpService) {}

  async sendTelegramMessage(
    request: TelegramAPIRequest,
  ): Promise<AxiosResponse<TelegramAPIResponse>> {
    const data = await firstValueFrom(
      this.httpService.post(
        `${BASEURL.baseUrlTelegramAPI}/sendMessage`,
        request,
      ),
    );
    return data;
  }
}
