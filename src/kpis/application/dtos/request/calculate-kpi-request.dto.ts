export class CalculateKpiRequest {
    constructor(
      public readonly sellerId: number,
      public readonly kpiStartDate: string,
      public readonly kpiEndDate: string,
      public readonly kpiType: string,
      public readonly KpiValue: number
  ) {}
}