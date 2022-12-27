import { MigrationInterface, QueryRunner } from 'typeorm';

export class mergeDatabase1679880406333 implements MigrationInterface {
  name = 'mergeDatabase1679880406333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "think_trash_emotions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "think_emotions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "think_emotions" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "think_trash_emotions" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying(30) NOT NULL`,
    );
  }
}
