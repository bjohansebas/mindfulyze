import { MigrationInterface, QueryRunner } from 'typeorm'

export class initProfile1679872587725 implements MigrationInterface {
  name = 'initProfile1679872587725'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS profile_users ( 
        profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        photo_url VARCHAR,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20),  
        years_old DATE,  
        preference_lang VARCHAR(2) NOT NULL,
        gender VARCHAR(10) NOT NULL,  
        created_at TIMESTAMP NOT NULL DEFAULT now(),  
        updated_at TIMESTAMP NOT NULL DEFAULT now(),
        user_id UUID NOT NULL UNIQUE,
        CONSTRAINT fk_user_profile
        FOREIGN KEY(user_id)
          REFERENCES users(user_id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
    );`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile_users" DROP CONSTRAINT "fk_user_profile"`)
    await queryRunner.query(`DROP TABLE "profile_users"`)
  }
}
