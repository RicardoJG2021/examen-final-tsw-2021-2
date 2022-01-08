import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1641537982106 implements MigrationInterface {
    name = 'InitialSchema1641537982106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('simular migration');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log('simular migration');
    }
}
