import { MigrationInterface, QueryRunner } from 'typeorm';

export class RatingInitialMigration1651612177009 implements MigrationInterface {
  name = 'RatingInitialMigration1651612177009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "studentId" integer NOT NULL, "subjectId" integer NOT NULL, "semester" integer NOT NULL, "rate" integer NOT NULL, CONSTRAINT "UQ_d5a04ee2e02be63fe60697456a0" UNIQUE ("studentId", "subjectId", "semester"), CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b110361349c7bcee2966f39ef5" ON "rating" ("studentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4b01a22829eafc9223f8b12d86" ON "rating" ("subjectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8efbe25914a13f933a84aa82ba" ON "rating" ("semester") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7c8562f25d309b60d37e1136f1" ON "rating" ("rate") `,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_b110361349c7bcee2966f39ef5a" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_4b01a22829eafc9223f8b12d862" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_4b01a22829eafc9223f8b12d862"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_b110361349c7bcee2966f39ef5a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7c8562f25d309b60d37e1136f1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8efbe25914a13f933a84aa82ba"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4b01a22829eafc9223f8b12d86"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b110361349c7bcee2966f39ef5"`,
    );
    await queryRunner.query(`DROP TABLE "rating"`);
  }
}
