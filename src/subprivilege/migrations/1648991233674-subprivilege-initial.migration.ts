import { MigrationInterface, QueryRunner } from 'typeorm';

export class SubprivilegeInitialMigration1648991233674
  implements MigrationInterface
{
  name = 'SubprivilegeInitialMigration1648991233674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subprivilege" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "privilegeId" integer NOT NULL, CONSTRAINT "UQ_fcb758ef7b7c4e9692e99ec64e8" UNIQUE ("name"), CONSTRAINT "PK_a38090d44d908ecf805de2dec57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subprivilege" ADD CONSTRAINT "FK_a0d3b760dd9b90a387b2a3da824" FOREIGN KEY ("privilegeId") REFERENCES "privilege"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subprivilege" DROP CONSTRAINT "FK_a0d3b760dd9b90a387b2a3da824"`,
    );
    await queryRunner.query(`DROP TABLE "subprivilege"`);
  }
}
