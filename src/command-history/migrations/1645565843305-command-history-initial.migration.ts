import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommandHistoryInitialMigration1645565843305
  implements MigrationInterface
{
  name = 'CommandHistoryInitialMigration1645565843305';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "command_history" (
                "id" SERIAL NOT NULL,
                "commandId" integer NOT NULL,
                "studentId" integer NOT NULL,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_eb9a32ffeeb0c2c08a59ab4a9a3" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "command_history"
            ADD CONSTRAINT "FK_04dbf3c81bdac47c5a9790ead72" FOREIGN KEY ("commandId") REFERENCES "command"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "command_history"
            ADD CONSTRAINT "FK_6df4500e31aefe80e9c0f33a414" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "command_history" DROP CONSTRAINT "FK_6df4500e31aefe80e9c0f33a414"
        `);
    await queryRunner.query(`
            ALTER TABLE "command_history" DROP CONSTRAINT "FK_04dbf3c81bdac47c5a9790ead72"
        `);
    await queryRunner.query(`
            DROP TABLE "command_history"
        `);
  }
}
