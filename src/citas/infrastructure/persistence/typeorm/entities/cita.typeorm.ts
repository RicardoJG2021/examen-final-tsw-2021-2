import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { SellerCategory } from 'src/sellers/domain/enums/seller-category.enum';
import { RucTypeORM } from '../value-objects/ruc.typeorm';

@Entity('seller')
// @Unique('UQ_seller_name', ['name'])
@Unique('UQ_seller_ruc', ['ruc.value'])
export class SellerTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column({
    length: 200
  })
  public name: string;
  
  @Column({ name: 'category', type: 'enum', enum: SellerCategory, default: SellerCategory.STANDARD })
  public category: SellerCategory;

  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}
