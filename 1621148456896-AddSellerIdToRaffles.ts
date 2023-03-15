import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddSellerIdToRaffles1621148456896 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'raffles',
            new TableColumn({
                name: 'seller_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'raffles',
            new TableForeignKey({
                columnNames: ['seller_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'sellers',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('raffles', 'seller_id');
        await queryRunner.dropColumn('raffles', 'seller_id');
    }
}
