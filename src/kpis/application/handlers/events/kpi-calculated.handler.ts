import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { KpiCalculated } from '../../../domain/events/kpi-calculated.event';

@EventsHandler(KpiCalculated)
export class KpiCalculatedHandler implements IEventHandler<KpiCalculated> {
  constructor() {}

  handle(event: KpiCalculated) {
    console.log('handle logic for KpiCalculated');
    console.log(event);
  }
}