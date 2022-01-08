import { AggregateRoot } from '@nestjs/cqrs';
import { TransactionRegistered } from '../events/transaction-registered.event';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { TransactionType } from '../enums/transaction-type.enum';

export class Transaction extends AggregateRoot {
  protected transactionId: number;
  protected sellerId: number;
  protected orderId: number;
  protected campaignId: number;
  protected transactionType: TransactionType;
  protected transactionAmount: number;
  protected readonly auditTrail: AuditTrail;

  public constructor(values: any) {
    super();
    this.sellerId = values.sellerId;
    this.orderId = values.orderId;
    this.campaignId = values.campaignId;
    this.transactionType = values.transactionType;
    this.transactionAmount = values.transactionAmount;
    this.auditTrail = values.auditTrail;
  }
  
  public getTransactionId(): number {
    return this.transactionId;
  }

  public getSellerId(): number {
    return this.sellerId;
  }
  
  public getOrderId(): number {
    return this.orderId;
  }
  
  public getCampaignId(): number {
    return this.campaignId;
  }

  public getTransactionType(): TransactionType {
    return this.transactionType;
  }
  
  public getTransactionAmount(): number {
    return this.transactionAmount;
  }
  
  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeTransactionId(transactionId: number) {
    this.transactionId = transactionId;
  }

  public changeSellerId(sellerId: number) {
    this.sellerId = sellerId;
  }
  
  public changeOrderId(orderId: number) {
    this.orderId = orderId;
  }
  
  public changeCampaignId(campaignId: number) {
    this.campaignId = campaignId;
  }

  public changeTransactionType(transactionType: TransactionType) {
    this.transactionType = transactionType;
  }
  
  public changeTransactionAmount(transactionAmount: number) {
    this.transactionAmount = transactionAmount;
  }

  public register() {
    const event = new TransactionRegistered(
      this.transactionId,
      this.sellerId,
      this.orderId,
      this.campaignId, 
      this.transactionType,
      this.transactionAmount
    );
    this.apply(event);
  }
}
