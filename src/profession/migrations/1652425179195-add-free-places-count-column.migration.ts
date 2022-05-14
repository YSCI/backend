import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFreePlacesCountColumn1652425179195
  implements MigrationInterface
{
  name = 'AddFreePlacesCountColumn1652425179195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profession" ADD "freePlacesCount" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profession" DROP COLUMN "freePlacesCount"`,
    );
  }
}
