import { MigrationInterface, QueryRunner } from 'typeorm';

export class NationalityInitialMigration1644794195786
  implements MigrationInterface
{
  name = 'NationalityInitialMigration1644794195786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "nationality" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_4a1e28419a719fdf8b861232e76" UNIQUE ("name"),
                CONSTRAINT "PK_ec4111a2e9f11d6b69312e4a77f" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "nationality"
        `);
  }
}
