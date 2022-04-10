import { MigrationInterface, QueryRunner } from 'typeorm';

export class RegionAndCommunityIdFieldsMakeNullable1649586027477
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "registrationRegionId" DROP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "registrationCommunityId" DROP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "residentRegionId" DROP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "residentRegionId" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "registrationRegionId" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "registrationCommunityId" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "residentRegionId" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "residentRegionId" SET NOT NULL`,
    );
  }
}
