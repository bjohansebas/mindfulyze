import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveArchiveTrash1689642708428 implements MigrationInterface {
	name = 'RemoveArchiveTrash1689642708428'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "thinks" DROP COLUMN "is_archive"
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "thinks"
            ADD "is_archive" boolean NOT NULL
        `)
	}
}
