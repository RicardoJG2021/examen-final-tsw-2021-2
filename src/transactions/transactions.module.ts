import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './api/transactions.controller';
import { TransactionApplicationService } from './application/services/transaction-application.service';
import { RegisterTransactionValidator } from './application/validators/register-transaction.validator';
import { RegisterTransactionHandler } from './application/handlers/commands/register-transaction.handler';
import { TransactionTypeORM } from './infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { TransactionRegisteredHandler } from './application/handlers/events/transaction-registered.handler';
import { GetTransactionsHandler } from './application/handlers/queries/get-transactions.handler';

export const CommandHandlers = [RegisterTransactionHandler];
export const EventHandlers = [TransactionRegisteredHandler];
export const QueryHandlers = [GetTransactionsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TransactionTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [TransactionsController],
  providers: [
    TransactionApplicationService,
    RegisterTransactionValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class TransactionsModule {}