import { Controller, Post, HttpStatus, Param, Res, Body } from '@nestjs/common';
import { SuccessService } from './success.service';
import { Logger } from '@nestjs/common';

@Controller('api/success')
export class SuccessController {
  private readonly logger = new Logger('api/success');
  constructor(private SuccessService: SuccessService) {}

  @Post()
  async start_new_order(@Body() request: any, @Res() response) {
    this.logger.warn('start_new_order');
    this.logger.warn(request);
    const clientData =
      await this.SuccessService.general_create_user_data_by_vtex_id(
        request.body.OrderId,
      );

    response.status(HttpStatus.CREATED).json(clientData);
  }
}
