import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCommunityIdAddDescription1648678863835
  implements MigrationInterface
{
  name = 'RemoveCommunityIdAddDescription1648678863835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "commissariat" ADD "description" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "commissariat" DROP COLUMN "description"`,
    );
  }
}
