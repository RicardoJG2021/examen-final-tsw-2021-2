import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TransactionRegistered } from '../../../domain/events/transaction-registered.event';

@EventsHandler(TransactionRegistered)
export class TransactionRegisteredHandler implements IEventHandler<TransactionRegistered> {
  constructor() {}

  handle(event: TransactionRegistered) {
    console.log('handle logic for TransactionRegistered');
    console.log(event);
  }
}