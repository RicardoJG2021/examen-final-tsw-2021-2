import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { TransactionApplicationService } from '../application/services/transaction-application.service';
import { RegisterTransactionRequest } from '../application/dtos/request/register-transaction-request.dto';
import { RegisterTransactionResponse } from '../application/dtos/response/register-transaction-response.dto';
import { GetTransactionsQuery } from '../application/queries/get-transactions.query';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionApplicationService: TransactionApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/')
  async registerTransaction(
    @Body() registerTransactionRequest: RegisterTransactionRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterTransactionResponse> = await this.transactionApplicationService.register(registerTransactionRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getTransactions(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const transactions = await this.queryBus.execute(new GetTransactionsQuery());
      return ApiController.ok(response, transactions);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
