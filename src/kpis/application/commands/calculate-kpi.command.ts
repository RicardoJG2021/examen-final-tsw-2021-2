export class CalculateKpi {
    constructor(
      public readonly sellerId: number,
      public readonly kpiStartDate: string,
      public readonly kpiEndDate: string,
      public readonly kpiType: string,
      public readonly kpiValue: number,
      public readonly createdAt: string,
      public readonly createdBy: number,
      public readonly updatedAt: string,
      public readonly updatedBy: number
    ) {}
}