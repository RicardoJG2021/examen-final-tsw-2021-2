import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerController } from './api/sellers.controller';
import { SellerApplicationService } from './application/services/seller-application.service';
import { RegisterSellerValidator } from './application/validators/register-seller.validator';
import { RegisterSellerHandler } from './application/handlers/commands/register-seller.handler';
import { SellerTypeORM } from './infrastructure/persistence/typeorm/entities/seller.typeorm';
import { SellerRegisteredHandler } from './application/handlers/events/seller-registered.handler';
import { GetSellersHandler } from './application/handlers/queries/get-sellers.handler';

export const CommandHandlers = [RegisterSellerHandler];
export const EventHandlers = [SellerRegisteredHandler];
export const QueryHandlers = [GetSellersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SellerTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [SellerController],
  providers: [
    SellerApplicationService,
    RegisterSellerValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class SellersModule {}