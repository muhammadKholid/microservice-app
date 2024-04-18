import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orderm {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: false
    })
    userId: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: false
    })
    productId: string;

    @Column({
        type: 'integer',
        nullable: false
    })
    total: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
}