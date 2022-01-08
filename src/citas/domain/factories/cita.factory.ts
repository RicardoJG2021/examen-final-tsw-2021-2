import { Cita } from '../entities/cita.entity';
import { SellerName } from '../value-objects/cita-name.value';
import { Ruc } from '../value-objects/ruc.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

export class SellerFactory {
  public static createFrom(name: SellerName, ruc: Ruc, auditTrail: AuditTrail): Cita {
    return new Cita(name, ruc, auditTrail);
  }
}