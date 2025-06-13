import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from 'src/activities/entities/activity.entity';

@Entity('entries')
export class Entry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp' })
    completionDate: Date;

    @Column()
    activityId: string;

    @ManyToOne(() => Activity, activity => activity.entries)
    @JoinColumn({ name: 'activityId' })
    activity: Activity;
}
