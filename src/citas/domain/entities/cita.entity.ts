import { AggregateRoot } from '@nestjs/cqrs';
import { SellerRegistered } from '../events/seller-registered.event';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { SellerCategory } from '../enums/seller-category.enum';
import { SellerId } from '../value-objects/seller-id.value'; 
import { SellerName } from '../value-objects/seller-name.value';
import { Ruc } from '../value-objects/ruc.value';

export class Seller extends AggregateRoot {
  protected id: SellerId;
  protected name: SellerName;
  protected category: SellerCategory;
  protected ruc: Ruc;
  protected readonly auditTrail: AuditTrail;

  public constructor(name: SellerName, ruc: Ruc, auditTrail: AuditTrail) {
    super();
    this.name = name;
    this.ruc = ruc;
    this.auditTrail = auditTrail;
  }
  
  public getId(): SellerId {
    return this.id;
  }

  public getName(): SellerName {
    return this.name;
  }

  public getCategory(): SellerCategory {
    return this.category;
  }

  public getRuc(): Ruc {
    return this.ruc;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: SellerId) {
    this.id = id;
  }

  public changeName(name: SellerName) {
    this.name = name;
  }
  
  public changeCategory(category: SellerCategory) {
    this.category = category;
  }
 
  public register() {
    const event = new SellerRegistered(this.id.getValue(), this.name.getValue(), this.ruc.getValue());
    this.apply(event);
  }
}
