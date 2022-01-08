import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSettings } from 'src/common/application/app-settings';
import { DateTime } from 'src/common/domain/value-objects/date-time.value';
import { KpiType } from 'src/kpis/domain/enums/kpi-type.enum';
import { TransactionTypeORM } from 'src/transactions/infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { Repository } from 'typeorm';
import { TransactionRegistered } from '../../../../transactions/domain/events/transaction-registered.event';
import { CalculateKpi } from '../../commands/calculate-kpi.command';

@EventsHandler(TransactionRegistered)
export class TransactionRegisteredHandler implements IEventHandler<TransactionRegistered> {
  constructor(
    @InjectRepository(TransactionTypeORM)
    private transactionRepository: Repository<TransactionTypeORM>,
    private commandBus: CommandBus
  ) {}
  
  async handle(event: TransactionRegistered) {
    let orderCount = await this.transactionRepository
      .createQueryBuilder()
      .where("seller_id = :sellerId AND transaction_type = :transactionType")
      .setParameter("sellerId", event.sellerId)
      .setParameter("transactionType", event.transactionType)     
      .getCount();

    const calculateKpi: CalculateKpi = new CalculateKpi(
      event.sellerId,
      DateTime.utcNow().format(),
      DateTime.utcNow().format(),
      KpiType.AMOUNT_ORDERS,
      orderCount,
      DateTime.utcNow().format(),
      AppSettings.SUPER_ADMIN,
      null,
      null
    );

    await this.commandBus.execute(calculateKpi);
  }
}