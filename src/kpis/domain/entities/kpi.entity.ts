import { AggregateRoot } from '@nestjs/cqrs';
import { KpiCalculated } from '../events/kpi-calculated.event';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { KpiType } from '../enums/kpi-type.enum';

export class Kpi extends AggregateRoot {
  protected kpiId: number;
  protected sellerId: number;
  protected kpiStartDate: string;
  protected kpiEndDate: string;
  protected kpiType: string;
  protected KpiValue: number;
  protected readonly auditTrail: AuditTrail;

  public constructor(values: any) {
    super();
    this.sellerId = values.sellerId;
    this.kpiStartDate = values.kpiStartDate;
    this.kpiEndDate = values.kpiEndDate;
    this.kpiType = values.kpiType;
    this.KpiValue = values.kpiValue;
    this.auditTrail = values.auditTrail;
  }
  
  public getKpiId(): number {
    return this.kpiId;
  }

  public getSellerId(): number {
    return this.sellerId;
  }
  
  public getKpiStartDate(): string {
    return this.kpiStartDate;
  }
  
  public getKpiEndDate(): string {
    return this.kpiEndDate;
  }

  public getKpiType(): string {
    return this.kpiType;
  }

  public getKpiValue(): number {
    return this.KpiValue;
  }
  
  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeKpiId(kpiId: number) {
    this.kpiId = kpiId;
  }

  public changeSellerId(sellerId: number) {
    this.sellerId = sellerId;
  }
  
  public changeKpiStartDate(kpiStartDate: string) {
    this.kpiStartDate = kpiStartDate;
  }
  
  public changeKpiEndDate(kpiEndDate: string) {
    this.kpiEndDate = kpiEndDate;
  }

  public changeKpiType(kpiType: string) {
    this.kpiType = kpiType;
  }

  public changeKpiValue(KpiValue: number) {
    this.KpiValue = KpiValue;
  }

  public calculate() {
    const event = new KpiCalculated(
      this.kpiId,
      this.sellerId,
      this.kpiStartDate,
      this.kpiEndDate,
      this.kpiType,
      this.KpiValue
    );
    this.apply(event);
  }
}
