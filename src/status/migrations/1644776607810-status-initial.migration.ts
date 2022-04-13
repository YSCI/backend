import { MigrationInterface, QueryRunner } from 'typeorm';

export class StatusInitialMigration1644776607810 implements MigrationInterface {
  name = 'StatusInitialMigration1644776607810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "status" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_a753a59dc47a5d2db09b4ad408f" UNIQUE ("name"),
                CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "status"
        `);
  }
}
