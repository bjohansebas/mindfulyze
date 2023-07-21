import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSessionTable1689946385680 implements MigrationInterface {
  name = 'AddSessionTable1689946385680'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "sessions" (
                "session_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "token" character varying NOT NULL,
                "expire" TIMESTAMP NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_9340188c93349808f10d1db74a8" PRIMARY KEY ("session_id")
            )
        `)
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "refresh_tokens"
        `)
    await queryRunner.query(`
            ALTER TABLE "sessions"
            ADD CONSTRAINT "fk_user_ss" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "sessions" DROP CONSTRAINT "fk_user_ss"
        `)
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "refresh_tokens" character varying array
        `)
    await queryRunner.query(`
            DROP TABLE "sessions"
        `)
  }
}
