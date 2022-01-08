export class KpiCalculated {
    constructor(
      public readonly kpiId: number,
      public readonly sellerId: number,
      public readonly kpiStartDate: string,
      public readonly kpiEndDate: string,
      public readonly kpiType: string,
      public readonly KpiValue: number
    ) {
    }
  }

  