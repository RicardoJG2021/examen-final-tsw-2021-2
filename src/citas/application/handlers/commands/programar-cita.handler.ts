import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { ProgramarCita } from 'src/citas/application/commands/programar-cita.command';
import { SellerId } from '../../../domain/value-objects/cita-id.value';
import { SellerName } from '../../../domain/value-objects/cita-name.value';
import { Ruc } from '../../../domain/value-objects/ruc.value';
import { SellerMapper } from '../../mappers/cita.mapper';
import { SellerFactory } from '../../../domain/factories/cita.factory';
import { Cita } from '../../../domain/entities/cita.entity';
import { SellerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/cita.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(ProgramarCita)
export class RegisterSellerHandler
  implements ICommandHandler<ProgramarCita> {
  constructor(
    @InjectRepository(SellerTypeORM)
    private sellerRepository: Repository<SellerTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: ProgramarCita) {
    let sellerId: number = 0;
    const sellerNameResult: Result<AppNotification, SellerName> = SellerName.create(command.name);
    if (sellerNameResult.isFailure()) {
      return sellerId;
    }
    const rucResult: Result<AppNotification, Ruc> = Ruc.create(command.ruc);
    if (rucResult.isFailure()) {
      return sellerId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    let seller: Cita = SellerFactory.createFrom(sellerNameResult.value, rucResult.value, auditTrail);
    let sellerTypeORM: SellerTypeORM = SellerMapper.toTypeORM(seller);
    sellerTypeORM = await this.sellerRepository.save(sellerTypeORM);
    if (sellerTypeORM == null) {
      return sellerId;
    }
    sellerId = Number(sellerTypeORM.id);
    seller.changeId(SellerId.of(sellerId));
    seller = this.publisher.mergeObjectContext(seller);
    seller.register();
    seller.commit();
    return sellerId;
  }
}