import {MigrationInterface, QueryRunner} from "typeorm";

export class creatingDatabase1643766526405 implements MigrationInterface {
    name = 'creatingDatabase1643766526405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`thumbnail\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`volume\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`productIngredients\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`productIdId\` varchar(36) NULL, \`ingridientIdId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ingridient\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`productIngredients\` ADD CONSTRAINT \`FK_40a37a2c0c3a0780a3637d65d83\` FOREIGN KEY (\`productIdId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productIngredients\` ADD CONSTRAINT \`FK_456e48f1a1ef4247bfb499a89e2\` FOREIGN KEY (\`ingridientIdId\`) REFERENCES \`ingridient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`productIngredients\` DROP FOREIGN KEY \`FK_456e48f1a1ef4247bfb499a89e2\``);
        await queryRunner.query(`ALTER TABLE \`productIngredients\` DROP FOREIGN KEY \`FK_40a37a2c0c3a0780a3637d65d83\``);
        await queryRunner.query(`DROP TABLE \`ingridient\``);
        await queryRunner.query(`DROP TABLE \`productIngredients\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
