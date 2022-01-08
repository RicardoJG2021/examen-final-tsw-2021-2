import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { SellerApplicationService } from '../application/services/cita-application.service'; 
import { ProgramarCitaRequest } from '../application/dtos/request/programar-cita-request.dto';
import { RegisterSellerResponse } from '../application/dtos/response/programar-cita-response.dto';
import { GetCitasQuery } from '../application/queries/get-citas.query';

@Controller('citas')
export class SellerController {
  constructor(
    private readonly sellerApplicationService: SellerApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/')
  async registerSeller(
    @Body() registerSellerRequest: ProgramarCitaRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterSellerResponse> = await this.sellerApplicationService.register(registerSellerRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getSellers(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const sellers = await this.queryBus.execute(new GetCitasQuery());
      return ApiController.ok(response, sellers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
