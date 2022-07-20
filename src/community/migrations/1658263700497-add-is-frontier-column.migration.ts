import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsFrontierColumn1658263700497 implements MigrationInterface {
  name = 'AddIsFrontierColumn1658263700497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "community" ADD "isFrontier" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "isFrontier"`);
  }
}
