import { Injectable } from '@nestjs/common';
import { AppNotification } from 'src/common/application/app.notification';
import { CalculateKpiRequest } from '../dtos/request/calculate-kpi-request.dto';

@Injectable()
export class CalculateKpiValidator {
  constructor() {
  }

  public async validate(
    calculateKpiRequest: CalculateKpiRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const sellerId: number = calculateKpiRequest.sellerId;
    if (sellerId === 0) {
      notification.addError('sellerId is required', null);
    }
    const kpiStartDate: string = calculateKpiRequest.kpiStartDate;
    if (!kpiStartDate) {
      notification.addError('kpiStartDate is required', null);
    }
    const kpiEndDate: string = calculateKpiRequest.kpiEndDate;
    if (!kpiEndDate) {
      notification.addError('kpiEndDate is required', null);
    }
    const kpiType: string = calculateKpiRequest.kpiType;
    if (!kpiType) {
      notification.addError('kpiType is required', null);
    }
    const KpiValue: number = calculateKpiRequest.KpiValue;
    if (KpiValue === 0) {
      notification.addError('transactionAmount is required', null);
    }    
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}