import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { BASEURL } from 'src/common/api-resource';
import { firstValueFrom } from 'rxjs';
import { ClientData } from '../dto/client_data';
import { PocData } from '../dto/poc_data';

@Injectable()
export class SuccessService {
  constructor(private readonly httpService: HttpService) {}

  //TELEGRAM - ALERTS TO POCS

  //Sends a canceled alert to pocs
  async telegram_group_canceled_alert(clientData: ClientData, chatId: string) {
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

  //sends a succes alert to pocs
  async telegram_group_success_poc_alert(
    clientData: ClientData,
    pocData: PocData,
  ): Promise<AxiosResponse> {
    const coordenadas: Array<any> = clientData.direccion.coordenadas.split(',');
    const request = {
      chat_id: pocData.tchatId,
      text: `
      *Hola ${pocData.pocName}!*\n*Usted tiene un nuevo pedido de:*\n\n*${
        clientData.cliente.nombre
      }*.\n\n*Número de celular:* ${
        clientData.cliente.celular
      }\n\n*Número de orden:* ${clientData.idOrden}\n\n*Tipo de pago:* ${
        clientData.pago
      }\n\n*Fecha del Pedido:* ${
        clientData.fechaDelPedido
      }\n\n*Tipo de Envío:* ${
        clientData.tipoEnvio
      }\n\n*El pedido es:*\n\n,${clientData.productos.map(
        (objeto) =>
          `> ${objeto.nombre} - ${objeto.cantidad} - ${objeto.precio}\n`,
      )}\n*Total:* ${clientData.total}\n*Costo de envío:* ${
        clientData.envio
      }\n\n*Comentarios del cliente:* ${
        clientData.comentario
      }\n\n*Cupón Utilizado:* ${
        clientData.cupon
      }\n\n*Enviar con la brevedad posible a la siguiente dirección:*\n\n${
        clientData.direccion.primaria
      } | ${clientData.direccion.ciudad}\n\n*Coordenadas en mapa*: 
        https://www.google.com/maps/search/?api=1&query=${coordenadas[1]},${
        coordenadas[0]
      }`,
      parse_mode: 'markdown',
    };
    const data = await firstValueFrom(
      this.httpService.post(
        `${BASEURL.baseUrlTelegramAPI}/sendMessage`,
        request,
      ),
    );
    return data.data;
  }

  async telegram_group_success_admin_alert(
    clientData: ClientData,
    pocData: PocData,
    chatId: string,
  ): Promise<AxiosResponse> {
    const coordenadas: Array<any> = clientData.direccion.coordenadas.split(',');
    const request = {
      chat_id: chatId,
      text: `
      *La Tienda ${pocData.pocName}!*\n*Tiene un nuevo pedido de:*\n\n*${
        clientData.cliente.nombre
      }*.\n\n*Número de celular:* ${
        clientData.cliente.celular
      }\n\n*Número de orden:* ${clientData.idOrden}\n\n*Tipo de pago:* ${
        clientData.pago
      }\n\n*Fecha del Pedido:* ${
        clientData.fechaDelPedido
      }\n\n*Tipo de Envío:* ${
        clientData.tipoEnvio
      }\n\n*El pedido es:*\n\n,${clientData.productos.map(
        (objeto) =>
          `> ${objeto.nombre} - ${objeto.cantidad} - ${objeto.precio}\n`,
      )}\n*Total:* ${clientData.total}\n*Costo de envío:* ${
        clientData.envio
      }\n\n*Comentarios del cliente:* ${
        clientData.comentario
      }\n\n*Cupón Utilizado:* ${
        clientData.cupon
      }\n\n*Dirección de envío del POC:*\n\n${
        clientData.direccion.primaria
      } | ${clientData.direccion.ciudad}\n\n*Coordenadas en mapa*: 
        https://www.google.com/maps/search/?api=1&query=${coordenadas[1]},${
        coordenadas[0]
      }
      `,
      parse_mode: 'markdown',
    };
    const data = await firstValueFrom(
      this.httpService.post(
        `${BASEURL.baseUrlTelegramAPI}/sendMessage`,
        request,
      ),
    );
    return data.data;
  }

  async telegram_group_success_payment_link_alert(
    clientData: ClientData,
    pocData: PocData,
    payphoneData: any,
    chatId: string,
    state: string,
  ): Promise<AxiosResponse> {
    let sendText: string;
    switch (state) {
      case 'successPoc':
        sendText = `
        *¡Hola ${pocData.pocName}!*👋\nEl cliente *${clientData.cliente.nombre}*\nHa realizado con *éxito* el pago por tarjeta de un pedido.🍻🍻\n\n*Su número de orden en VTEX es:* ${clientData.idOrden}\n\n*Su número de orden en Payphone es:* ${payphoneData.transactionId}\n\n*Total Pagado:* ${clientData.total}\n\n*Pago Verificado por Payphone*
        `;
        break;
      case 'successAdmin':
        sendText = `
          *¡Hola Administrador!*\n\nEl siguiente POC: *${pocData.pocName}*\nHa recibido un pago *exitoso* por medio de tarjeta de créito.\n\n*El cliente:* ${clientData.cliente.nombre}\n\n*Su número de orden en VTEX es:* ${clientData.idOrden}\n\n*Su número de orden en Payphone es:* ${payphoneData.transactionId}\n\n*Total Pagado:* ${clientData.total}\n\n*Pago Verificado por Payphone*
          `;
        break;
      case 'failedAdmin':
        sendText = `
          *¡Hola Administrador!*\n\nEl siguiente Poc: *${pocData.pocName}*\nHa recibido un pago *Fallido* por medio de tarjeta de créito.\n\n*El cliente:* ${clientData.cliente.nombre}\n\n*Su número de orden en VTEX es:* ${clientData.idOrden}\n\n*Su número de orden en Payphone es:* ${payphoneData.transactionId}\n\n*Total que se debio haber pagado:* ${clientData.total}\n\n*Pago Verificado por Payphone*
          `;
        break;
      default:
        break;
    }
    const request = {
      chat_id: chatId,
      text: sendText,
      parse_mode: 'markdown',
    };
    const data = await firstValueFrom(
      this.httpService.post(
        `${BASEURL.baseUrlTelegramAPI}/sendMessage`,
        request,
      ),
    );
    return data.data;
  }

  //CHATAPI - ALERTS TO CLIENTS
  async chat_api_individual_payment_link_alert(
    clientData: ClientData,
    urlPayment: string,
  ): Promise<AxiosResponse> {
    const request = {};
    const data = await firstValueFrom(
      this.httpService.post(
        `${BASEURL.baseUrlChatAPI}/sendTemplate?token=w4zuj9n7xpucl3hk`,
        request,
      ),
    );
    return data.data;
  }

  async chat_api_individual_failed_payment_link_alert(
    clientData: ClientData,
    urlPayment: string,
    chatId: string,
  ): Promise<AxiosResponse> {
    const request = {
      chat_id: chatId,
      text: `
      *¡Hola ${clientData.cliente.nombre}!*\n*Gracias por comprar en Fiesta Cerca*.\n\nHemos notado que cuenta con problemas para realizar su pago, por dicha razón el link anterior fue inhabilitado\n\nPara continuar con el proceso de pago por tarjeta, es necesario que ingreses los datos en el *Nuevo* siguiente link; el cual tiene una validez de *10 minutos* luego de enviado este mensaje. Apenas esté completado el pago se te redireccionará a WhatsApp para confirmar\n\n*Link de Pago:*\n\n ${urlPayment}
      `,
      parse_mode: 'markdown',
    };
    const data = await firstValueFrom(
      this.httpService.post(
        `${BASEURL.baseUrlChatAPI}/sendMessage?token=w4zuj9n7xpucl3hk`,
        request,
      ),
    );
    return data.data;
  }

  //GENERAL
  async general_create_url_payphone(
    clientData: ClientData,
    pocData: PocData,
  ): Promise<string> {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    const money = clientData.total;
    const moneyNumber = Math.round(
      Number(money.replace(/[^0-9.-]+/g, '')) * 100,
    );
    const requestPayphone = {
      amount: moneyNumber,
      tax: 0,
      amountWithTax: 0,
      amountWithoutTax: moneyNumber,
      service: 0,
      tip: 0,
      currency: 'USD',
      reference: `${clientData.idOrden}`,
      clientTransactionId: `${s4() + s4()}`,
      storeId: pocData.pocPayphone,
      oneTime: true,
      expireIn: 0,
      responseUrl: 'https://heimdalec-ws.herokuapp.com/paymentConfirmed',
    };
    const urlPayphone = await firstValueFrom(
      this.httpService.post(
        `https://pay.payphonetodoesposible.com/api/button/Prepare`,
        requestPayphone,
        {
          headers: {
            'Content-Type': 'application/json', // afaik this one is not needed
            Authorization:
              'Bearer VtMgk_GPtebUOPRqLIyolUTSiDZ4tZ7VdXFRqbEp4OptdNPMt_dDhdqigPT9rEnSWxbLB7EnhwRGG03MnSx-NdCg50VqgoqD6GV4LzoH_l49E3vkaHvZbgc5GkhgbTBwC7n07ZyYFJ_Cunl-kAXiflYQYNInsr5_-pKy-FNevlJTOct7BtApvP4WOnH5psIvWwLRTnS9oRofO5Gq8xDWbeoybgQ7Cg2FejraQ6FytOYcadojv_uuD5S7KgM0lwqJhlNrYzfQYESUPXbLDGE_0p1TkBDw5oJlWBWri-QFHgpAJX8F8MZRAGOjQspuldYSqJENjM926N4mjolo7WBaa_kpMNA',
          },
        },
      ),
    );
    const bigUrl = `http://heimdalec-ws.herokuapp.com/paymentLink?url=${urlPayphone.data.payWithPayPhone}`;
    const requestShort = {
      originalURL: bigUrl,
      domain: '477t.short.gy',
    };
    const urlShorted = await firstValueFrom(
      this.httpService.post(
        `https://pay.payphonetodoesposible.com/api/button/Prepare`,
        requestShort,
        {
          headers: {
            'Content-Type': 'application/json', // afaik this one is not needed
            Authorization: 'sk_58xXHd6WN1xUFYAw',
          },
        },
      ),
    );
    return urlShorted.data.shortUrl;
  }

  async general_check_url_paymphone(
    id: string,
    clientTxId: string,
  ): Promise<AxiosResponse> {
    const body = { id: id, clientTxId: clientTxId };
    const data = await firstValueFrom(
      this.httpService.post(
        `https://pay.payphonetodoesposible.com/api/button/V2/Confirm`,
        body,
        {
          headers: {
            'Content-Type': 'application/json', // afaik this one is not needed
            Authorization:
              'Bearer VtMgk_GPtebUOPRqLIyolUTSiDZ4tZ7VdXFRqbEp4OptdNPMt_dDhdqigPT9rEnSWxbLB7EnhwRGG03MnSx-NdCg50VqgoqD6GV4LzoH_l49E3vkaHvZbgc5GkhgbTBwC7n07ZyYFJ_Cunl-kAXiflYQYNInsr5_-pKy-FNevlJTOct7BtApvP4WOnH5psIvWwLRTnS9oRofO5Gq8xDWbeoybgQ7Cg2FejraQ6FytOYcadojv_uuD5S7KgM0lwqJhlNrYzfQYESUPXbLDGE_0p1TkBDw5oJlWBWri-QFHgpAJX8F8MZRAGOjQspuldYSqJENjM926N4mjolo7WBaa_kpMNA',
          },
        },
      ),
    );
    return data.data;
  }

  async general_create_user_data_by_vtex_id(id: string) {
    const vtexLink = `https://fiestacerca.myvtex.com/api/oms/pvt/orders/${id}`;
    let items: Array<any>;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });

    const data = await firstValueFrom(
      this.httpService.get(vtexLink, {
        headers: {
          'X-VTEX-API-AppKey': 'vtexappkey-fiestacerca-UHUNNL',
          'X-VTEX-API-AppToken':
            'IZMAMFXECKQBMCQQUADZLMKYBPRQRNOLMZIITAQXVBNFKSSWKUGUDDXWOOYXOHNPVEPMUHWTKFDJYFNJWUFWGUHJCLUECSIOOYJGDFCCYMJXZNYIBPAUCQIBWFKINRRR',
          Cookie: 'janus_sid=df23b59a-49a8-4b3c-aff0-d9582f829f28',
        },
      }),
    );

    data.data.items.forEach((item: any) => {
      items.push({
        nombre: item.name,
        cantidad: item.quantity,
        precio: formatter.format(
          parseInt((item.sellingPrice / 100).toFixed(2)),
        ),
        id: item.productId,
      });
    });

    const tempDate = new Date(data.data.creationDate);
    const tempYear = tempDate.getFullYear();
    const tempMonth = tempDate.getMonth() + 1;
    const tempDay = tempDate.getDate();
    let dt: string;
    let month: string;

    if (tempDay < 10) {
      dt = '0' + tempDay;
    }
    if (tempMonth < 10) {
      month = '0' + tempMonth;
    }

    const sendData = {
      cliente: {
        nombre:
          data.data.clientProfileData.firstName +
          ' ' +
          data.data.clientProfileData.lastName,
        celular: data.data.clientProfileData.phone,
        correo: data.data.clientProfileData.email,
      },
      tipoEnvio: 'Domicilio',
      direccion: {
        primaria:
          data.data.shippingData.address.street +
          ' ' +
          data.data.shippingData.address.number,
        ciudad:
          data.data.shippingData.address.city +
          ' - ' +
          data.data.shippingData.address.state,
        coordenadas:
          data.data.shippingData.address.geoCoordinates[0] +
          ',' +
          data.data.shippingData.address.geoCoordinates[1],
      },
      idOrden: data.data.orderId,
      fechaDelPedido: tempYear + '-' + month + '-' + dt,
      productos: items,
      idPoc: data.data.sellers[0].id,
      pago: data.data.paymentData.transactions[0].payments[0].paymentSystemName,
      comentario:
        data.data.openTextField == null
          ? 'No dejó comentarios'
          : data.data.openTextField.value == ''
          ? 'No dejó comentarios'
          : data.data.openTextField.value,
      cupon:
        data.data.marketingData == null
          ? 'No aplicó cupón'
          : data.data.marketingData.coupon,
      envio: 'Grátis',
      total: formatter.format(
        parseInt(
          (
            data.data.paymentData.transactions[0].payments[0].value / 100
          ).toFixed(2),
        ),
      ),
    };

    return sendData;
  }
}
