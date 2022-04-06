import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentRegionCommunityAndIdentificationDataColumns1649282946906
  implements MigrationInterface
{
  name = 'StudentRegionCommunityAndIdentificationDataColumns1649282946906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD "registrationRegionId" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD "registrationCommunityId" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD "residentRegionId" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD "residentCommunityId" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD "passportSeries" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD "socialCardNumber" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_1960512ad5d51b41e9e1f7da1cf" FOREIGN KEY ("registrationRegionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_38038ab3f037c2c7a464615851b" FOREIGN KEY ("registrationCommunityId") REFERENCES "community"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_b56cb1e5b7973b0cff66e050619" FOREIGN KEY ("residentRegionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_d4f6f622e8d616716aade6a2c68" FOREIGN KEY ("residentCommunityId") REFERENCES "community"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_d4f6f622e8d616716aade6a2c68"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_b56cb1e5b7973b0cff66e050619"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_38038ab3f037c2c7a464615851b"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_1960512ad5d51b41e9e1f7da1cf"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP COLUMN "socialCardNumber"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP COLUMN "passportSeries"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP COLUMN "residentCommunityId"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP COLUMN "residentRegionId"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP COLUMN "registrationCommunityId"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP COLUMN "registrationRegionId"
        `);
  }
}
