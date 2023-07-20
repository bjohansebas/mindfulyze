import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveUserOfColors1689297207775 implements MigrationInterface {
	name = 'RemoveUserOfColors1689297207775'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "colors" DROP CONSTRAINT "fk_user_co"
        `)
		await queryRunner.query(`
            ALTER TABLE "colors" DROP COLUMN "user_id"
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "colors"
            ADD "user_id" uuid
        `)
		await queryRunner.query(`
            ALTER TABLE "colors"
            ADD CONSTRAINT "fk_user_co" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `)
	}
}
