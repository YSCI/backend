import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentInitialMigration1645582308865
  implements MigrationInterface
{
  name = 'StudentInitialMigration1645582308865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "student" (
                "id" SERIAL NOT NULL,
                "firstname" character varying NOT NULL,
                "lastname" character varying NOT NULL,
                "fathername" character varying NOT NULL,
                "dateOfBirth" TIMESTAMP WITH TIME ZONE NOT NULL,
                "registrationAddress" character varying NOT NULL,
                "residentAddress" character varying NOT NULL,
                "contactNumbers" character varying array NOT NULL,
                "citizenshipId" integer NOT NULL,
                "nationalityId" integer NOT NULL,
                "professionId" integer NOT NULL,
                "healthStatusId" integer NOT NULL,
                "statusId" integer NOT NULL,
                "commissariatId" integer NOT NULL,
                "dateOfAcceptance" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "acceptanceCommandNumber" character varying NOT NULL,
                "currentCourse" integer NOT NULL,
                "currentGroup" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "command_history"
            ADD "commandNumber" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_1b1abc329f0c0ab04160dd05182" FOREIGN KEY ("citizenshipId") REFERENCES "citizenship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_984951d61ec4ec7d0e2e826051c" FOREIGN KEY ("nationalityId") REFERENCES "nationality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_2185fec177595094ef7cf8e489e" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_82c4fdb7aef9e19b5eec5fe603a" FOREIGN KEY ("healthStatusId") REFERENCES "health_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_2a732e0a8abf2d3b2c3e97f2923" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_f6b7cda3b70784d1ce2d8fb8d1a" FOREIGN KEY ("commissariatId") REFERENCES "commissariat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_f6b7cda3b70784d1ce2d8fb8d1a"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_2a732e0a8abf2d3b2c3e97f2923"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_82c4fdb7aef9e19b5eec5fe603a"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_2185fec177595094ef7cf8e489e"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_984951d61ec4ec7d0e2e826051c"
        `);
    await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_1b1abc329f0c0ab04160dd05182"
        `);
    await queryRunner.query(`
            ALTER TABLE "command_history" DROP COLUMN "commandNumber"
        `);

    await queryRunner.query(`
            DROP TABLE "student"
        `);
  }
}
