import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetTransactionsQuery } from '../../queries/get-transactions.query';
import { GetTransactionsDto } from '../../dtos/queries/get-transactions.dto';

@QueryHandler(GetTransactionsQuery)
export class GetTransactionsHandler implements IQueryHandler<GetTransactionsQuery> {
  constructor() {}

  async execute(query: GetTransactionsQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.transaction_id,
      a.seller_id,
      a.order_id,
      a.campaign_id,
      a.transaction_type,
      a.transaction_amount,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      transaction a
    ORDER BY
      a.created_at DESC;`;
    const ormTransactions = await manager.query(sql);
    if (ormTransactions.length <= 0) {
      return [];
    }
    const transactions: GetTransactionsDto[] = ormTransactions.map(function (ormTransaction) {
      let transactionDto = new GetTransactionsDto();
      transactionDto.transactionId = Number(ormTransaction.transaction_id);
      transactionDto.sellerId = Number(ormTransaction.seller_id);
      transactionDto.orderId = Number(ormTransaction.order_id);
      transactionDto.campaignId = Number(ormTransaction.campaign_id);
      transactionDto.transactionType = ormTransaction.transaction_type;
      transactionDto.transactionAmount = Number(ormTransaction.transaction_amount);
      transactionDto.createdAt = ormTransaction.created_at;
      transactionDto.createdBy = ormTransaction.created_by;
      transactionDto.updatedAt = ormTransaction.updated_at;
      transactionDto.updatedBy = ormTransaction.updated_by;
      return transactionDto;
    });
    return transactions;
  }
}