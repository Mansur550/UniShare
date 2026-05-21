import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    // ManyToOne,
    // JoinColumn,
    // OneToMany,
    // ManyToMany,
    // JoinTable,
} from 'typeorm';
// import { User } from 'src/user/user.entity';
// import { ModeratorEntity } from 'src/moderator/moderator.entity';

@Entity('resources')
export class Resource {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column()
    category: string;

    @Column({ type: 'simple-array', nullable: true })
    tags: string[];

    @Column()
    fileUrl: string;

    @Column({ nullable: true })
    fileName: string;

    @Column({ type: 'varchar', nullable: true })
    fileType: string;

    @Column({ type: 'bigint', nullable: true })
    fileSize: number;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ default: 0 })
    downloadCount: number;

    @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
    averageRating: number;

    @Column({ default: 0 })
    feedbackCount: number;

    @Column({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected', 'under_review'],
        default: 'pending',
    })
    moderationStatus: 'pending' | 'approved' | 'rejected' | 'under_review';

    @Column({ nullable: true, type: 'text' })
    moderatorFeedback: string;

    @Column({ nullable: true, type: 'boolean' })
    isPublished: boolean;

    @Column({ nullable: true, type: 'boolean' })
    isFeatured: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    // @ManyToOne(() => User, (user) => user.resources, {
    //   eager: true,
    //   onDelete: 'CASCADE',
    // })
    // @JoinColumn({ name: 'user_id' })
    // uploader: User;

    // @ManyToMany(() => User, (user) => user.savedResources, {
    //   onDelete: 'CASCADE',
    // })
    // @JoinTable({
    //   name: 'user_saved_resources',
    //   joinColumn: { name: 'resource_id' },
    //   inverseJoinColumn: { name: 'user_id' },
    // })
    // savedByUsers: User[];

    //   @ManyToOne(() => ModeratorEntity, (moderator) => moderator.resources, {
    //     nullable: true,
    //     eager: true,
    //     onDelete: 'SET NULL',
    //   })
    //   @JoinColumn({ name: 'moderator_id' })
    //   moderator: ModeratorEntity;
}