import { MigrationInterface, QueryRunner } from 'typeorm';

export class HealthStatusInitialMigration1644762800116
  implements MigrationInterface
{
  name = 'HealthStatusInitialMigration1644762800116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "health_status" (
                "id" SERIAL NOT NULL,
                "status" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_5dc2523b0191be1e10cd5b87b34" UNIQUE ("status"),
                CONSTRAINT "PK_fbb873afb0f257d4586a9131cbb" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "health_status"
        `);
  }
}
