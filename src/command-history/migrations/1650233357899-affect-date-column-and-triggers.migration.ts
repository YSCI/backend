import { MigrationInterface, QueryRunner } from 'typeorm';

export class AffectDateColumnAndTriggers1650233357899
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP CONSTRAINT "FK_04dbf3c81bdac47c5a9790ead72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP CONSTRAINT "FK_6df4500e31aefe80e9c0f33a414"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD "affectDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD CONSTRAINT "FK_04dbf3c81bdac47c5a9790ead72" FOREIGN KEY ("commandId") REFERENCES "command"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD CONSTRAINT "FK_6df4500e31aefe80e9c0f33a414" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP CONSTRAINT "FK_6df4500e31aefe80e9c0f33a414"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP CONSTRAINT "FK_04dbf3c81bdac47c5a9790ead72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" DROP COLUMN "affectDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD CONSTRAINT "FK_6df4500e31aefe80e9c0f33a414" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "command_history" ADD CONSTRAINT "FK_04dbf3c81bdac47c5a9790ead72" FOREIGN KEY ("commandId") REFERENCES "command"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
