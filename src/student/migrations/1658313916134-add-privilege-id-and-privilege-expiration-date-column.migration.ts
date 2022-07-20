import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrivilegeIdAndPrivilegeExpirationDateColumn1658313916134
  implements MigrationInterface
{
  name = 'AddPrivilegeIdAndPrivilegeExpirationDateColumn1658313916134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "student" ADD "privilegeId" integer`);
    await queryRunner.query(
      `ALTER TABLE "student" ADD "privilegeExpirationDate" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_453de27a882480c1768c0202dad" FOREIGN KEY ("privilegeId") REFERENCES "privilege"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_453de27a882480c1768c0202dad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" DROP COLUMN "privilegeExpirationDate"`,
    );
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "privilegeId"`);
  }
}
