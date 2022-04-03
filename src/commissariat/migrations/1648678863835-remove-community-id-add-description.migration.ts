import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveCommunityIdAddDescription1648678863835
  implements MigrationInterface
{
  name = 'RemoveCommunityIdAddDescription1648678863835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "commissariat" DROP CONSTRAINT "FK_ccdbc31d7aed8cd8b141dfe3faf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "commissariat" DROP COLUMN "communityId"`,
    );

    await queryRunner.query(
      `ALTER TABLE "commissariat" ADD "description" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "commissariat" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "commissariat" ADD "communityId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "commissariat" ADD CONSTRAINT "FK_ccdbc31d7aed8cd8b141dfe3faf" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
