export class GetTransactionsDto {
    public transactionId: number;
    public sellerId: number;
    public orderId: number;
    public campaignId: number;
    public transactionType: string;
    public transactionAmount: number;
    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
  }