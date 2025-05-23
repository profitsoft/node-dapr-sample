import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ClientTableCreate1725552036505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'SERIAL',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'tenantId',
            type: 'int',
          },
          {
            name: 'contractCount',
            type: 'int',
            isNullable: true,
            default: 0,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
