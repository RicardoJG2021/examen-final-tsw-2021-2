import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { RegisterTransaction } from 'src/transactions/application/commands/register-transaction.command';
import { TransactionMapper } from '../../mappers/transaction.mapper';
import { TransactionFactory } from '../../../domain/factories/transaction.factory';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(RegisterTransaction)
export class RegisterTransactionHandler
  implements ICommandHandler<RegisterTransaction> {
  constructor(
    @InjectRepository(TransactionTypeORM)
    private transactionRepository: Repository<TransactionTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterTransaction) {
    let transactionId: number = 0;
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    const values = {
      sellerId: command.sellerId,
      orderId: command.orderId,
      campaignId: command.campaignId,
      transactionType: command.transactionType,
      transactionAmount: command.transactionAmount
    }
    let transaction: Transaction = TransactionFactory.createFrom(values);
    let transactionTypeORM: TransactionTypeORM = TransactionMapper.toTypeORM(transaction);
    transactionTypeORM = await this.transactionRepository.save(transactionTypeORM);
    if (transactionTypeORM == null) {
      return transactionId;
    }
    transactionId = Number(transactionTypeORM.transaction_id);
    transaction.changeTransactionId(transactionId);
    transaction = this.publisher.mergeObjectContext(transaction);
    transaction.register();
    transaction.commit();
    return transactionId;
  }
}