import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';
import { RegisterSeller } from '../commands/register-seller.command';
import { RegisterSellerValidator } from '../validators/register-seller.validator';
import { RegisterSellerRequest } from '../dtos/request/register-seller-request.dto';
import { RegisterSellerResponse } from '../dtos/response/register-seller-response.dto';

@Injectable()
export class SellerApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerSellerValidator: RegisterSellerValidator,
  ) {}

  async register(
    registerSellerRequest: RegisterSellerRequest,
  ): Promise<Result<AppNotification, RegisterSellerResponse>> {
    const notification: AppNotification = await this.registerSellerValidator.validate(registerSellerRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerSeller: RegisterSeller = new RegisterSeller(
      registerSellerRequest.name,
      registerSellerRequest.ruc,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const sellerId = await this.commandBus.execute(registerSeller);
    const registerSellerResponse: RegisterSellerResponse = new RegisterSellerResponse(
        sellerId,
      registerSellerRequest.name,
      registerSellerRequest.ruc
    );
    return Result.ok(registerSellerResponse);
  }
}