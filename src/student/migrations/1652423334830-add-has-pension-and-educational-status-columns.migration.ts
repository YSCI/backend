import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHasPensionAndEducationalStatusColumns1652423334830
  implements MigrationInterface
{
  name = 'AddHasPensionAndEducationalStatusColumns1652423334830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ADD "hasPension" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD "educationStatus" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP COLUMN "educationStatus"`,
    );
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "hasPension"`);
  }
}
