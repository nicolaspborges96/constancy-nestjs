import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('frequencies')
export class Frequency {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ['daily', 'weekly', 'monthly'],
        default: 'weekly'
    })
    unit: 'daily' | 'weekly' | 'monthly';

    @Column({ type: 'int' })
    times: number;
}
