import { Transaction } from '../entities/transaction.entity';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

export class TransactionFactory {
  public static createFrom(values: any): Transaction {
    return new Transaction(values);
  }
}