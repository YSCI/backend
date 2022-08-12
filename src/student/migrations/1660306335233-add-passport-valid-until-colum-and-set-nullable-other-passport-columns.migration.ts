import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPassportValidUntilColumAndSetNullableOtherPassportColumns1660306335233
  implements MigrationInterface
{
  name =
    'AddPassportValidUntilColumAndSetNullableOtherPassportColumns1660306335233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ADD "passportValidUntil" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "passportDateOfIssue" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "passportIssuedBy" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "passportType" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "passportType" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "passportIssuedBy" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "passportDateOfIssue" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" DROP COLUMN "passportValidUntil"`,
    );
  }
}
