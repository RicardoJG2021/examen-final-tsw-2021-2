import { AggregateRoot } from '@nestjs/cqrs';
import { SellerRegistered } from '../events/cita-programada.event';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { CitaCategory } from '../enums/cita-category.enum';
import { SellerId } from '../value-objects/cita-id.value'; 
import { SellerName } from '../value-objects/cita-name.value';
import { Ruc } from '../value-objects/ruc.value';

export class Cita extends AggregateRoot {
  protected id: SellerId;
  protected name: SellerName;
  protected category: CitaCategory;
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

  public getCategory(): CitaCategory {
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
  
  public changeCategory(category: CitaCategory) {
    this.category = category;
  }
 
  public register() {
    const event = new SellerRegistered(this.id.getValue(), this.name.getValue(), this.ruc.getValue());
    this.apply(event);
  }
}
