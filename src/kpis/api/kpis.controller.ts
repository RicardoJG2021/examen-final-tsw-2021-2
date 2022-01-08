import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetKpisQuery } from '../application/queries/get-kpis.query';

@Controller('kpis')
export class KpisController {
  constructor(
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  async getKpis(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const kpis = await this.queryBus.execute(new GetKpisQuery());
      return ApiController.ok(response, kpis);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}

