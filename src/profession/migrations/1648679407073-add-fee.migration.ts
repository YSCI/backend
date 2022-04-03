import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFee1648679407073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profession" ADD "fee" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profession" DROP COLUMN "fee"`);
  }
}
