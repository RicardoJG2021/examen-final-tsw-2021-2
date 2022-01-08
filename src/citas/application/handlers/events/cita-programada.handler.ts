import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { SellerRegistered } from '../../../domain/events/cita-programada.event';

@EventsHandler(SellerRegistered)
export class CitaProgramadaHandler implements IEventHandler<SellerRegistered> {
  constructor() {}

  handle(event: SellerRegistered) {
    console.log('handle logic for Cita Programada');
    console.log(event);
  }
}