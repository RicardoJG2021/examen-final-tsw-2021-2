import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { SellerTypeORM } from '../../infrastructure/persistence/typeorm/entities/seller.typeorm';
import { RegisterSellerRequest } from '../dtos/request/register-seller-request.dto';

@Injectable()
export class RegisterSellerValidator {
  constructor(
    @InjectRepository(SellerTypeORM)
    private sellerRepository: Repository<SellerTypeORM>,
  ) {
  }

  public async validate(
    registerSellerRequest: RegisterSellerRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerSellerRequest.name.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    const ruc: string = registerSellerRequest.ruc.trim();
    if (ruc.length <= 0) {
      notification.addError('ruc is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const seller: SellerTypeORM = await this.sellerRepository.createQueryBuilder().where("ruc = :ruc", { ruc }).getOne();
    if (seller != null) {
      notification.addError('ruc is taken', null);
    }
    return notification;
  }
}