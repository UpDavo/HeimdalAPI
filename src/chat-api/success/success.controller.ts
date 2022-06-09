import { Controller, Post, HttpStatus, Param, Res, Body } from '@nestjs/common';
import { SuccessService } from './success.service';
import { Logger } from '@nestjs/common';
import { ClientData } from '../dto/client_data';
import { PocData } from '../dto/poc_data';
import { VtexData } from '../dto/vtex_webhook';
import { FirebaseConnection } from '../common/firebase_connection';

@Controller('api/success')
export class SuccessController {
  private readonly logger = new Logger('api/success');
  constructor(
    private SuccessService: SuccessService,
    private FirebaseConnection: FirebaseConnection,
  ) {}

  @Post()
  async start_new_order(@Body() request: VtexData, @Res() response) {
    this.logger.warn('start_new_order');

    const messages: Array<any> = [];

    //Obtiene la data del cliente haciendo una request a vtex
    const clientData: ClientData =
      await this.SuccessService.general_create_user_data_by_vtex_id(
        request.OrderId,
      );

    //Obtener data de los pocs mediante request a firebase
    const pocData: PocData = await this.FirebaseConnection.getPocsData(
      clientData.idPoc,
    );

    //Envía un mensaje al poc
    const telegram_success_poc_alert =
      await this.SuccessService.telegram_group_success_poc_alert(
        clientData,
        pocData,
      );
    messages.push({
      telegram_success_poc_alert: telegram_success_poc_alert.ok,
      chat_id: telegram_success_poc_alert.result.chat.id,
      title: telegram_success_poc_alert.result.chat.title,
    });

    //Envía un mensaje al grupo general
    const telegram_success_admin_alert =
      await this.SuccessService.telegram_group_success_admin_alert(
        clientData,
        pocData,
        '-1001643876159',
      );
    messages.push({
      telegram_success_admin_alert: telegram_success_admin_alert.ok,
      chat_id: telegram_success_admin_alert.result.chat.id,
      title: telegram_success_admin_alert.result.chat.title,
    });

    //Revisa si es pago con tarjeta
    if (clientData.pago == 'Tarjeta de Crédito/Débito contra entrega') {
      //Obtiene el url acortado de payphone
      const shortUrlPath =
        await this.SuccessService.general_create_url_payphone(
          clientData,
          pocData,
        );

      //Envía un mensaje al cliente
      const chatAPI_success_client_url_alert =
        await this.SuccessService.chat_api_individual_payment_link_alert(
          clientData,
          shortUrlPath,
        );
      messages.push({
        chatAPI_success_client_url_alert: chatAPI_success_client_url_alert.sent,
        chat_id: chatAPI_success_client_url_alert.message,
        title: chatAPI_success_client_url_alert.description,
      });
    }
    const final = {
      request: request,
      clientData: clientData,
      pocData: pocData,
      messages: messages,
    };
    this.logger.warn(final);
    response.status(HttpStatus.CREATED).json(final);
  }
}
