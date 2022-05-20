import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommissariatIdSetNullable1653033462727
  implements MigrationInterface
{
  name = 'CommissariatIdSetNullable1653033462727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_f6b7cda3b70784d1ce2d8fb8d1a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "commissariatId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_f6b7cda3b70784d1ce2d8fb8d1a" FOREIGN KEY ("commissariatId") REFERENCES "commissariat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_f6b7cda3b70784d1ce2d8fb8d1a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "commissariatId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_f6b7cda3b70784d1ce2d8fb8d1a" FOREIGN KEY ("commissariatId") REFERENCES "commissariat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
