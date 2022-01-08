import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { KpiType } from 'src/kpis/domain/enums/kpi-type.enum';

@Entity('kpi')
export class KpiTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'kpi_id', unsigned: true })
  public kpi_id: number;

  @Column({ type: 'int'})
  public seller_id: number;

  @Column('datetime', { name: 'kpi_start_date', nullable: true })
  public kpi_start_date: string;

  @Column('datetime', { name: 'kpi_end_date', nullable: true })
  public kpi_end_date: string;

  @Column({ name: 'kpi_type', type: 'enum', enum: KpiType, default: KpiType.AMOUNT_ORDERS })
  public kpi_type: string;

  @Column({ type: 'decimal'})
  public kpi_value: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}
