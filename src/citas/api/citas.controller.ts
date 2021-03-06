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
export class CitaController {
  constructor(
    private readonly sellerApplicationService: SellerApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/')
  async registerCita(
    @Body() programarCitaRequest: ProgramarCitaRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterSellerResponse> = await this.sellerApplicationService.register(programarCitaRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getCitas(@Res({ passthrough: true }) response): Promise<object> {
    try {
     // const citas = await this.queryBus.execute(new GetCitasQuery());
     const citas = new GetCitasQuery();
     citas.id=1;
     citas.mensaje="Examen de Sistema de Citas para Mascota";
      return ApiController.ok(response, citas);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
