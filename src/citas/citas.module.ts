import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerController } from './api/citas.controller';
import { SellerApplicationService } from './application/services/cita-application.service';
import { RegisterSellerValidator } from './application/validators/programar-cita.validator';
import { RegisterSellerHandler } from './application/handlers/commands/programar-cita.handler';
import { SellerTypeORM } from './infrastructure/persistence/typeorm/entities/cita.typeorm';
import { CitaProgramadaHandler } from './application/handlers/events/cita-programada.handler';
import { GetSellersHandler } from './application/handlers/queries/get-citas.handler';

export const CommandHandlers = [RegisterSellerHandler];
export const EventHandlers = [CitaProgramadaHandler];
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