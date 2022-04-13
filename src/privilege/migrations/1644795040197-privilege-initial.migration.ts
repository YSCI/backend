import { MigrationInterface, QueryRunner } from 'typeorm';

export class PrivilegeInitialMigration1644795040197
  implements MigrationInterface
{
  name = 'PrivilegeInitialMigration1644795040197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "privilege" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_4e876d36829a0e2bd28634a67b7" UNIQUE ("name"),
                CONSTRAINT "PK_b1691196ff9c996998bab2e406e" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "privilege"
        `);
  }
}
