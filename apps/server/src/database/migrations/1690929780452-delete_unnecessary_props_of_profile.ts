import { MigrationInterface, QueryRunner } from 'typeorm'

export class DeleteUnnecessaryPropsOfProfile1690929780452 implements MigrationInterface {
  name = 'DeleteUnnecessaryPropsOfProfile1690929780452'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile_users" DROP COLUMN "photo_url"`)
    await queryRunner.query(`ALTER TABLE "profile_users" DROP COLUMN "first_name"`)
    await queryRunner.query(`ALTER TABLE "profile_users" DROP COLUMN "last_name"`)
    await queryRunner.query(`ALTER TABLE "profile_users" DROP COLUMN "years_old"`)
    await queryRunner.query(`ALTER TABLE "profile_users" DROP COLUMN "preference_lang"`)
    await queryRunner.query(`ALTER TABLE "profile_users" DROP COLUMN "gender"`)
    await queryRunner.query(`ALTER TABLE "profile_users" ADD "name" character varying NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile_users" DROP COLUMN "name"`)
    await queryRunner.query(`ALTER TABLE "profile_users" ADD "gender" character varying(10) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "profile_users" ADD "preference_lang" character varying(2) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "profile_users" ADD "years_old" date`)
    await queryRunner.query(`ALTER TABLE "profile_users" ADD "last_name" character varying(20)`)
    await queryRunner.query(`ALTER TABLE "profile_users" ADD "first_name" character varying(20) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "profile_users" ADD "photo_url" character varying`)
  }
}
