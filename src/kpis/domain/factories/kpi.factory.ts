import { Kpi } from '../entities/kpi.entity';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

export class KpiFactory {
  public static createFrom(values: any): Kpi {
    return new Kpi(values);
  }
}