import { Controller, Post, HttpStatus, Param, Res, Body } from '@nestjs/common';
import { SuccessService } from './success.service';
import { Logger } from '@nestjs/common';
import { ClientData } from '../dto/client_data';
import { PocData } from '../dto/poc_data';

@Controller('api/success')
export class SuccessController {
  private readonly logger = new Logger('api/success');
  constructor(private SuccessService: SuccessService) {}

  @Post()
  async start_new_order(@Body() request: any, @Res() response) {
    this.logger.warn('start_new_order');
    this.logger.warn(request);

    //Obtiene la data del cliente haciendo una request a vtex
    const clientData: ClientData =
      await this.SuccessService.general_create_user_data_by_vtex_id(
        request.body.OrderId,
      );

    //Obtener data de los pocs mediante request a firebase
    const pocDataFirebase = await db
      .collection('pocs')
      .doc(clientData.idPoc)
      .get()
      .data();
    //Organiza los datos de firebase
    const pocData: PocData = {
      pocId: pocDataFirebase.pocId,
      pocPayphone: pocDataFirebase.pocPayphone,
      pocName: pocDataFirebase.name,
      pocPhone: pocDataFirebase.phone,
      lastLogin: '',
      pocSector: pocDataFirebase.direction,
      groupId: pocDataFirebase.groupId,
      tchatId: pocDataFirebase.tchatId,
    };

    //Envía un mensaje al poc
    await this.SuccessService.telegram_group_success_poc_alert(
      clientData,
      pocData,
    );

    //Envía un mensaje al grupo general
    await this.SuccessService.telegram_group_success_admin_alert(
      clientData,
      pocData,
      '-1001643876159',
    );

    //Revisa si es pago con tarjeta
    if (clientData.pago == 'Tarjeta de Crédito/Débito contra entrega') {
      //Obtiene el url acortado de payphone
      const urlPayment = await this.SuccessService.general_create_url_payphone(
        clientData,
        pocData,
      );

      //Envía un mensaje al cliente
      await this.SuccessService.chat_api_individual_payment_link_alert(
        clientData,
        urlPayment,
      );
    }

    response.status(HttpStatus.CREATED).json(clientData);
  }
}
