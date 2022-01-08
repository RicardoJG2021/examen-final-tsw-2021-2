import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1641537982106 implements MigrationInterface {
    name = 'InitialSchema1641537982106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db-evaluacion-seller\`.\`kpi\` CHANGE \`kpi_start_date\` \`kpi_start_date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`db-evaluacion-seller\`.\`kpi\` CHANGE \`kpi_end_date\` \`kpi_end_date\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db-evaluacion-seller\`.\`kpi\` CHANGE \`kpi_end_date\` \`kpi_end_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db-evaluacion-seller\`.\`kpi\` CHANGE \`kpi_start_date\` \`kpi_start_date\` datetime NOT NULL`);
    }

}
