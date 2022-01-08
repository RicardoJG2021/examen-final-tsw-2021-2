import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionTypeORM } from '../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class TransactionMapper {
  public static toTypeORM(transaction: Transaction): TransactionTypeORM {
    const transactionTypeORM: TransactionTypeORM = new TransactionTypeORM();
    transactionTypeORM.seller_id = transaction.getSellerId();
    transactionTypeORM.order_id = transaction.getOrderId();
    transactionTypeORM.campaign_id = transaction.getCampaignId();
    transactionTypeORM.transaction_type = transaction.getTransactionType();
    transactionTypeORM.transaction_amount = transaction.getTransactionAmount();
    const createdAt: string = transaction.getAuditTrail() != null && transaction.getAuditTrail().getCreatedAt() != null ? transaction.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = transaction.getAuditTrail() != null && transaction.getAuditTrail().getCreatedBy() != null ? transaction.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = transaction.getAuditTrail() != null && transaction.getAuditTrail().getUpdatedAt() != null ? transaction.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = transaction.getAuditTrail() != null && transaction.getAuditTrail().getUpdatedBy() != null ? transaction.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    transactionTypeORM.auditTrail = auditTrailTypeORM;
    return transactionTypeORM;
  }
}