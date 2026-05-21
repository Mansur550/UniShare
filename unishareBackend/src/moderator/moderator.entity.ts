import { StudentEntity } from "src/student/student.entity";
import { CommonUserEntity } from "src/user/user.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("moderator")
export class ModeratorEntity {
  @PrimaryGeneratedColumn()
  id: number;




  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'file_name', nullable: false })
  fileName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //OneTOManyRelationship 
  @OneToMany(() => StudentEntity, student => student.moderator, { cascade: true })
  student: StudentEntity[];

}

//LabTask-3
@Entity("User")
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 10000);
  }

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150 })
  fullName: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

}


@Entity("Contributor")
export class CreateContributorEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  age: number;

  @OneToOne(() => CommonUserEntity, commonuser => commonuser.createContributor)
  commonuser: CommonUserEntity;

}

@Entity()
export class ResigterUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // hashed password
}










//Many-to-many relationship between Product and Category
// // product.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable }
// from 'typeorm';
// import { Category } from './category.entity';
// @Entity()
// export class Product {
// @PrimaryGeneratedColumn()
// id: number;
// @Column()
// name: string;
// @ManyToMany(() => Category, category => category.products)
// @JoinTable()
// categories: Category[];
// }


//  // category.entity.ts
//  import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from
// 'typeorm';
//  import { Product } from './product.entity';
//  @Entity()
//  export class Category {
//  @PrimaryGeneratedColumn()
//  id: number;
//  @Column()
//  name: string;
//  @ManyToMany(() => Product, product => product.categories)
//  products: Product[];
//  }