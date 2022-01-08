import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetKpisQuery } from '../../queries/get-kpis.query';
import { GetKpisDto } from '../../dtos/queries/get-kpis.dto';

@QueryHandler(GetKpisQuery)
export class GetKpisHandler implements IQueryHandler<GetKpisQuery> {
  constructor() {}

  async execute(query: GetKpisQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.kpi_id,
      a.seller_id,
      a.kpi_start_date,
      a.kpi_end_date,
      a.kpi_type,
      a.kpi_value,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      kpi a
    ORDER BY
      a.created_at DESC;`;
    const ormKpis = await manager.query(sql);
    if (ormKpis.length <= 0) {
      return [];
    }
    const kpis: GetKpisDto[] = ormKpis.map(function (ormKpi) {
      let kpiDto = new GetKpisDto();
      kpiDto.kpiId = Number(ormKpi.kpi_id);
      kpiDto.kpiStartDate = ormKpi.kpi_start_date;
      kpiDto.kpiEndDate = ormKpi.kpi_end_date;
      kpiDto.kpiType = ormKpi.kpi_type;
      kpiDto.KpiValue = ormKpi.kpi_value;
      kpiDto.sellerId = Number(ormKpi.seller_id);
      kpiDto.createdAt = ormKpi.created_at;
      kpiDto.createdBy = ormKpi.created_by;
      kpiDto.updatedAt = ormKpi.updated_at;
      kpiDto.updatedBy = ormKpi.updated_by;
      return kpiDto;
    });
    return kpis;
  }
}