import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';
import { RegisterTransaction } from '../commands/register-transaction.command';
import { RegisterTransactionValidator } from '../validators/register-transaction.validator';
import { RegisterTransactionRequest } from '../dtos/request/register-transaction-request.dto';
import { RegisterTransactionResponse } from '../dtos/response/register-transaction-response.dto';

@Injectable()
export class TransactionApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerTransactionValidator: RegisterTransactionValidator
  ) {}

  async register(
    registerTransactionRequest: RegisterTransactionRequest,
  ): Promise<Result<AppNotification, RegisterTransactionResponse>> {
    const notification: AppNotification = await this.registerTransactionValidator.validate(registerTransactionRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerTransaction: RegisterTransaction = new RegisterTransaction(
      registerTransactionRequest.sellerId,
      registerTransactionRequest.orderId,
      registerTransactionRequest.campaignId,
      registerTransactionRequest.transactionType,
      registerTransactionRequest.transactionAmount,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );

    const transactionId = await this.commandBus.execute(registerTransaction);
    const registerTransactionResponse: RegisterTransactionResponse = new RegisterTransactionResponse(
      transactionId,
      registerTransactionRequest.sellerId,
      registerTransactionRequest.orderId,
      registerTransactionRequest.campaignId,
      registerTransactionRequest.transactionType,
      registerTransactionRequest.transactionAmount
    );
    return Result.ok(registerTransactionResponse
      );
  }
}