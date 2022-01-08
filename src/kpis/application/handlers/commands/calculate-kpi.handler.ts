import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { CalculateKpi } from 'src/kpis/application/commands/calculate-kpi.command';
import { KpiMapper } from '../../mappers/kpi.mapper';
import { KpiFactory } from '../../../domain/factories/kpi.factory';
import { Kpi } from '../../../domain/entities/kpi.entity';
import { KpiTypeORM } from '../../../infrastructure/persistence/typeorm/entities/kpi.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(CalculateKpi)
export class CalculateKpiHandler
  implements ICommandHandler<CalculateKpi> {
  constructor(
    @InjectRepository(KpiTypeORM)
    private KpiRepository: Repository<KpiTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: CalculateKpi) {
    let kpiId: number = 0;
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    const values = {
      sellerId: command.sellerId,
      kpiStartDate: command.kpiStartDate,
      kpiEndDate: command.kpiEndDate,
      kpiType: command.kpiType,
      kpiValue: command.kpiValue
    }
    
    let kpiOldValue: KpiTypeORM = await this.KpiRepository
    .createQueryBuilder()
    .where("seller_id = :sellerId AND kpi_type = :kpiType")
    .setParameter("sellerId", command.sellerId)
    .setParameter("kpiType", command.kpiType)   
    .getOne();

    let kpi: Kpi = KpiFactory.createFrom(values);
    let kpiTypeORM: KpiTypeORM;
    if (kpiOldValue == null) {
      kpiTypeORM = KpiMapper.toTypeORM(kpi);
    } else {
      kpiOldValue.kpi_value = command.kpiValue;
      kpiTypeORM = kpiOldValue;
    }

    kpiTypeORM = await this.KpiRepository.save(kpiTypeORM);
    if (kpiTypeORM == null) {
      return kpiId;
    }
    kpiId = Number(kpiTypeORM.kpi_id);
    kpi.changeKpiId(kpiId);
    kpi = this.publisher.mergeObjectContext(kpi);
    kpi.calculate();
    kpi.commit();
    return kpiId;
  }
}