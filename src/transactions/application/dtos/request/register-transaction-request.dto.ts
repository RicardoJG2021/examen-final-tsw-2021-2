export class RegisterTransactionRequest {
    constructor(
      public readonly sellerId: number,
      public readonly orderId: number,
      public readonly campaignId: number,
      public readonly transactionType: string,
      public readonly transactionAmount: number
  ) {}
}