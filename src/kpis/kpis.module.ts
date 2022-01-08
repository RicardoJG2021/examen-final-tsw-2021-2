import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpisController } from './api/kpis.controller';
import { KpiApplicationService } from './application/services/kpi-application.service';
import { CalculateKpiValidator } from './application/validators/calculate-kpi.validator';
import { CalculateKpiHandler } from './application/handlers/commands/calculate-kpi.handler';
import { KpiTypeORM } from './infrastructure/persistence/typeorm/entities/kpi.typeorm';
import { KpiCalculatedHandler } from './application/handlers/events/kpi-calculated.handler';
import { TransactionRegisteredHandler } from './application/handlers/events/transaction-registered.handler';
import { TransactionTypeORM } from 'src/transactions/infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { GetKpisHandler } from './application/handlers/queries/get-kpis.handler';

export const CommandHandlers = [CalculateKpiHandler];
export const EventHandlers = [KpiCalculatedHandler, TransactionRegisteredHandler];
export const QueryHandlers = [GetKpisHandler];
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([KpiTypeORM, TransactionTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [KpisController],
  providers: [
    KpiApplicationService,
    CalculateKpiValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class KpisModule {}