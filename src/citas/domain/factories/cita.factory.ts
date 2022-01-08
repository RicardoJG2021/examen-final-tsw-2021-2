import { Seller } from '../entities/seller.entity';
import { SellerName } from '../value-objects/seller-name.value';
import { Ruc } from '../value-objects/ruc.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

export class SellerFactory {
  public static createFrom(name: SellerName, ruc: Ruc, auditTrail: AuditTrail): Seller {
    return new Seller(name, ruc, auditTrail);
  }
}