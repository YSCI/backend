import { MigrationInterface, QueryRunner } from 'typeorm';

export class PassportUtilsAndEducationBasisColumns1657681391075
  implements MigrationInterface
{
  name = 'PassportUtilsAndEducationBasisColumns1657681391075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ADD "passportDateOfIssue" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD "passportIssuedBy" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD "passportType" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD "educationBasis" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP COLUMN "educationBasis"`,
    );
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "passportType"`);
    await queryRunner.query(
      `ALTER TABLE "student" DROP COLUMN "passportIssuedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" DROP COLUMN "passportDateOfIssue"`,
    );
  }
}
