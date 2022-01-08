import { RucTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/ruc.typeorm';
import { Cita } from '../../domain/entities/cita.entity';
import { SellerTypeORM } from '../../infrastructure/persistence/typeorm/entities/cita.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class SellerMapper {
  public static toTypeORM(seller: Cita): SellerTypeORM {
    const sellerTypeORM: SellerTypeORM = new SellerTypeORM();
    sellerTypeORM.name = seller.getName().getValue();
    sellerTypeORM.ruc = RucTypeORM.from(seller.getRuc().getValue());
    const createdAt: string = seller.getAuditTrail() != null && seller.getAuditTrail().getCreatedAt() != null ? seller.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = seller.getAuditTrail() != null && seller.getAuditTrail().getCreatedBy() != null ? seller.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = seller.getAuditTrail() != null && seller.getAuditTrail().getUpdatedAt() != null ? seller.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = seller.getAuditTrail() != null && seller.getAuditTrail().getUpdatedBy() != null ? seller.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    sellerTypeORM.auditTrail = auditTrailTypeORM;
    return sellerTypeORM;
  }
}