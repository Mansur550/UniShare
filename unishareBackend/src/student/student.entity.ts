import { ModeratorEntity } from "src/moderator/moderator.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class StudentEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    uname: string;

    

    @ManyToOne(() => ModeratorEntity, moderator =>moderator.student)
    moderator:ModeratorEntity;
}