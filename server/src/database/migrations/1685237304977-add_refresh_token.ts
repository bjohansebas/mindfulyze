import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshToken1685237304977 implements MigrationInterface {
  name = 'AddRefreshToken1685237304977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "refresh_tokens" character varying array
        `);
    await queryRunner.query(`
            ALTER TABLE "think_trash_emotions"
            ALTER COLUMN "created_at" DROP DEFAULT
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "think_trash_emotions"
            ALTER COLUMN "created_at"
            SET DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "refresh_tokens"
        `);
  }
}
