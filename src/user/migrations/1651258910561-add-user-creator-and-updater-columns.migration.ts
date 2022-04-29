import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserCreatorAndUpdaterColumns1651258910561
  implements MigrationInterface
{
  name = 'AddUserCreatorAndUpdaterColumns1651258910561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "creatorId" integer DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updaterId" integer DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_b40ff13132b995b758b1187ee8a" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4fcaea5d3ef7631da8a6e8b0de8" FOREIGN KEY ("updaterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_4fcaea5d3ef7631da8a6e8b0de8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_b40ff13132b995b758b1187ee8a"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updaterId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "creatorId"`);
  }
}
