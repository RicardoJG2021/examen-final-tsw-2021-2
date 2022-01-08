export class TransactionRegistered {
    constructor(
      public readonly transactionId: number,
      public readonly sellerId: number,
      public readonly orderId: number,
      public readonly campaignId: number,
      public readonly transactionType: string,
      public readonly transaction_amount: number
    ) {
    }
  }

  