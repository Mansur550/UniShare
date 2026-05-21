import { CreateContributorEntity } from "src/moderator/moderator.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class CommonUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;


    @OneToOne(() => CreateContributorEntity, createcontributor => createcontributor.commonuser, { cascade: true })

    @JoinColumn()
    createContributor: CreateContributorEntity;
}
