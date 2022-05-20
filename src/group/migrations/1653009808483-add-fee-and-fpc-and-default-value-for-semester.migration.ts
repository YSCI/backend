import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFeeAndFPCAndDefaultValueForSemester1653009808483
  implements MigrationInterface
{
  name = 'AddFeeAndFPCAndDefaultValueForSemester1653009808483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" ADD "freePlacesCount" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD "fee" numeric NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "currentSemester" SET DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" ALTER COLUMN "currentSemester" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "fee"`);
    await queryRunner.query(
      `ALTER TABLE "group" DROP COLUMN "freePlacesCount"`,
    );
  }
}
