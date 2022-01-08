import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';
import { CalculateKpi } from '../commands/calculate-kpi.command';
import { CalculateKpiValidator } from '../validators/calculate-kpi.validator';
import { CalculateKpiRequest } from '../dtos/request/calculate-kpi-request.dto';
import { CalculateKpiResponse } from '../dtos/response/calculate-kpi-response.dto';

@Injectable()
export class KpiApplicationService {
  constructor(
    private commandBus: CommandBus,
    private calculateKpiValidator: CalculateKpiValidator
  ) {}

  async calculate(
    calculateKpiRequest: CalculateKpiRequest,
  ): Promise<Result<AppNotification, CalculateKpiResponse>> {
    const notification: AppNotification = await this.calculateKpiValidator.validate(calculateKpiRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const calculateKpi: CalculateKpi = new CalculateKpi(
      calculateKpiRequest.sellerId,
      calculateKpiRequest.kpiStartDate,
      calculateKpiRequest.kpiEndDate,
      calculateKpiRequest.kpiType,
      calculateKpiRequest.KpiValue,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );

    const kpiId = await this.commandBus.execute(calculateKpi);
    const calculateKpiResponse: CalculateKpiResponse = new CalculateKpiResponse(
      kpiId,
      calculateKpiRequest.sellerId,
      calculateKpiRequest.kpiStartDate,
      calculateKpiRequest.kpiEndDate,
      calculateKpiRequest.kpiType,
      calculateKpiRequest.KpiValue,
    );
    return Result.ok(calculateKpiResponse);
  }
}