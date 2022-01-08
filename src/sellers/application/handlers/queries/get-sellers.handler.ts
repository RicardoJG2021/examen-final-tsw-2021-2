import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetSellersQuery } from '../../queries/get-sellers.query';
import { GetSellersDto } from '../../dtos/queries/get-sellers.dto';

@QueryHandler(GetSellersQuery)
export class GetSellersHandler implements IQueryHandler<GetSellersQuery> {
  constructor() {}

  async execute(query: GetSellersQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.name,
      a.ruc,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      seller a
    ORDER BY
      a.created_at DESC;`;

    const ormSellers = await manager.query(sql);
    if (ormSellers.length <= 0) {
      return [];
    }
    const sellers: GetSellersDto[] = ormSellers.map(function (ormSeller) {
      let sellerDto = new GetSellersDto();
      sellerDto.id = Number(ormSeller.id);
      sellerDto.name = ormSeller.name;
      sellerDto.ruc = ormSeller.ruc;
      sellerDto.createdAt = ormSeller.created_at;
      sellerDto.createdBy = ormSeller.created_by;
      sellerDto.updatedAt = ormSeller.updated_at;
      sellerDto.updatedBy = ormSeller.updated_by;
      return sellerDto;
    });
    return sellers;
  }
}