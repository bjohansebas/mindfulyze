import { MigrationInterface, QueryRunner } from 'typeorm'

export class initUsers1679872344547 implements MigrationInterface {
  name = 'initUsers1679872344547'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" VARCHAR(30) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "changed_password_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
