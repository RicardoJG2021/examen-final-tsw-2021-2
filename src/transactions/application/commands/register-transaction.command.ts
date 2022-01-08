export class RegisterTransaction {
    constructor(
      public readonly sellerId: number,
      public readonly orderId: number,
      public readonly campaignId: number,
      public readonly transactionType: string,
      public readonly transactionAmount: number,
      public readonly createdAt: string,
      public readonly createdBy: number,
      public readonly updatedAt: string,
      public readonly updatedBy: number
    ) {}
}