import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { SellerApplicationService } from '../application/services/seller-application.service';
// import { GetSellerQuery } from '../application/queries/get-seller.query';
import { RegisterSellerRequest } from '../application/dtos/request/register-seller-request.dto';
import { RegisterSellerResponse } from '../application/dtos/response/register-seller-response.dto';
import { GetSellersQuery } from '../application/queries/get-sellers.query';

@Controller('sellers')
export class SellerController {
  constructor(
    private readonly sellerApplicationService: SellerApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/')
  async registerSeller(
    @Body() registerSellerRequest: RegisterSellerRequest,
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
      const sellers = await this.queryBus.execute(new GetSellersQuery());
      return ApiController.ok(response, sellers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
