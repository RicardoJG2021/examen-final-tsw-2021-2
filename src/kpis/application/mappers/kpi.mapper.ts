import { Kpi } from '../../domain/entities/kpi.entity';
import { KpiTypeORM } from '../../infrastructure/persistence/typeorm/entities/kpi.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class KpiMapper {
  public static toTypeORM(kpi: Kpi): KpiTypeORM {
    const kpiTypeORM: KpiTypeORM = new KpiTypeORM();
    kpiTypeORM.seller_id = kpi.getSellerId();
    kpiTypeORM.kpi_start_date = kpi.getKpiStartDate();
    kpiTypeORM.kpi_end_date = kpi.getKpiEndDate();
    kpiTypeORM.kpi_type = kpi.getKpiType();
    kpiTypeORM.kpi_value = kpi.getKpiValue();
    const createdAt: string = kpi.getAuditTrail() != null && kpi.getAuditTrail().getCreatedAt() != null ? kpi.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = kpi.getAuditTrail() != null && kpi.getAuditTrail().getCreatedBy() != null ? kpi.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = kpi.getAuditTrail() != null && kpi.getAuditTrail().getUpdatedAt() != null ? kpi.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = kpi.getAuditTrail() != null && kpi.getAuditTrail().getUpdatedBy() != null ? kpi.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    kpiTypeORM.auditTrail = auditTrailTypeORM;
    return kpiTypeORM;
  }
}