import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTenants1724968872601 implements MigrationInterface {
    name = 'CreateTenants1724968872601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenants" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);

        await Promise.all([
            queryRunner.query(`
                INSERT INTO "tenants" ("name") VALUES ('System')
            `),
            queryRunner.query(`
                INSERT INTO "tenants" ("name") VALUES ('Smiths')
            `)
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}
