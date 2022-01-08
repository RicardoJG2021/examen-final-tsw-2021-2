import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { TransactionType } from 'src/transactions/domain/enums/transaction-type.enum';

@Entity('transaction')
export class TransactionTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'transaction_id', unsigned: true })
  public transaction_id: number;

  @Column({ type: 'int'})
  public seller_id: number;

  @Column({ type: 'int'})
  public order_id: number;

  @Column({ type: 'int'})
  public campaign_id: number;

  @Column({ name: 'transaction_type', type: 'enum', enum: TransactionType, default: TransactionType.SALES })
  public transaction_type: TransactionType;

  @Column({ type: 'decimal'})
  public transaction_amount: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}
