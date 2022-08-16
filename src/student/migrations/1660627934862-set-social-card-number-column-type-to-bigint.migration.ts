import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetSocialCardNumberColumnTypeToBigint1660627934862
  implements MigrationInterface
{
  name = 'SetSocialCardNumberColumnTypeToBigint1660627934862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "socialCardNumber" TYPE bigint`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "socialCardNumber" TYPE integer`,
    );
  }
}
