import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Entry } from 'src/entries/entities/entry.entity';

@Entity('activities')
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    weeklyFrequency: number;

    @Column({ nullable: true, type: 'float', default: 1 })
    ponderosity: number;

    @OneToMany(() => Entry, entry => entry.activity, { cascade: true, onDelete: 'CASCADE' })
    entries: Entry[];
}
