import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { RegisterSeller } from 'src/sellers/application/commands/register-seller.command';
import { SellerId } from '../../../domain/value-objects/seller-id.value';
import { SellerName } from '../../../domain/value-objects/seller-name.value';
import { Ruc } from '../../../domain/value-objects/ruc.value';
import { SellerMapper } from '../../mappers/seller.mapper';
import { SellerFactory } from '../../../domain/factories/seller.factory';
import { Seller } from '../../../domain/entities/seller.entity';
import { SellerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/seller.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(RegisterSeller)
export class RegisterSellerHandler
  implements ICommandHandler<RegisterSeller> {
  constructor(
    @InjectRepository(SellerTypeORM)
    private sellerRepository: Repository<SellerTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterSeller) {
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
    let seller: Seller = SellerFactory.createFrom(sellerNameResult.value, rucResult.value, auditTrail);
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