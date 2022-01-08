import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { SellerRegistered } from '../../../domain/events/seller-registered.event';

@EventsHandler(SellerRegistered)
export class SellerRegisteredHandler implements IEventHandler<SellerRegistered> {
  constructor() {}

  handle(event: SellerRegistered) {
    console.log('handle logic for SellerRegistered');
    console.log(event);
  }
}