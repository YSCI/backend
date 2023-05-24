import { PointSystem } from 'src/common/enums/point-system.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetPointSystemTo20ForExams1684909404619
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "subject" SET "pointSystem" = ${PointSystem.Twenty} WHERE "name" ILIKE '%քննություն%'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "subject" SET "pointSystem" = DEFAULT WHERE "name" ILIKE '%քննություն%'`,
    );
  }
}
