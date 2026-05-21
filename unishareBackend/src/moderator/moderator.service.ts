import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContributorDTO, CreateUserDto, PostReDto, RegisterUsertDto, updatephnDTO } from './moderator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateContributorEntity, ModeratorEntity, ResigterUserEntity, UserEntity } from './moderator.entity';

import { StudentEntity } from 'src/student/student.entity';
import { CommonUserEntity } from 'src/user/user.entity';
import *as bcrypt from 'bcrypt';

@Injectable()
export class ModeratorService {


  constructor(
    @InjectRepository(ModeratorEntity) private moderatorRepo: Repository<ModeratorEntity>,

    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    
    @InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>,

    @InjectRepository(CreateContributorEntity) private contributorRepo : Repository<CreateContributorEntity>,

    @InjectRepository(CommonUserEntity) private commonuserRepo : Repository <CommonUserEntity>,
    @InjectRepository(ResigterUserEntity) private  regRepo: Repository <ResigterUserEntity>
  ){}
   
    

    //get method for testing 
    getHello(): string {
        return 'hello  from gethello!';

    }

    getResource(id: number): object {
        return {message: `Resource details for ID: ${id}`, Details: {id: id, name: 'HCI', category: 'Book'}};
      }

///////////////////////////////
async createCommonUser(
  commonUser: CommonUserEntity,contributor: CreateContributorEntity,): Promise<CommonUserEntity> {

  //Save contributor
  const savedContributor = await this.contributorRepo.save(contributor);
  commonUser.createContributor = savedContributor;
  return this.commonuserRepo.save(commonUser);
}
     


      getById(id: number): object {
        return {
          message: `Resource details for ID: ${id}`,
          resourceDetails: { id: id, title: 'JavaScript Basics', status: 'approved' }
        };
      }



      newPost(postRe: PostReDto) {
        //
        console.log('Upolad', postRe);
        return {message: "Upload success!!"
        }
      }

      async createPost(postRe: PostReDto) {
        return this.moderatorRepo.save(postRe);
      }

      getDetails(): Promise<ModeratorEntity[]>{
        return this.moderatorRepo.find();
      }



      // updatePassword(id: number, password: string): object{
      //   return{
      //     message: 'Password Updated for id: ${id}',
      //     newPassword: password
      //   }
      // }

   

//Lab-3
    // Create a new user
  
    async createUser(data: CreateUserDto ){
      const user = this.userRepo.create(data);
      return this.userRepo.save(user);

    }


      
    async searchByFullName(sub: string) {
    return this.userRepo.find({
      where: { fullName: Like(`%${sub}%`) }
    });
    }


     
      async getByUsername(username: string) {
      const user = await this.userRepo.findOne({
      where: { username: username },
      });
    
      if (!user) {
        throw new NotFoundException(
          `User with username '${username}' not found`,
        );
      }
    
      return user;
     }


    
  //  async deleteByUsername(username: string) {
  //  const result = await this.userRepo.delete({ username });

  //  if (result.affected===0) {
  //  throw new NotFoundException(`User with username '${username}' not found`);
  //  }

  //  return { message: `User '${username}' deleted successfully` };
  // }


  async updateStatus(username: string, isActive: boolean) {
    const user = await this.userRepo.findOne({ where: { username } });
  
    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }
  
    user.isActive = isActive;
    return this.userRepo.save(user);
  }



  // async deleteById(id: number) {
  //   const result = await this.userRepo.delete({ id });
 
  //   if (!result) {
  //   throw new NotFoundException(`User with username '${id}' not found`);
  //   }
 
  //   return { message: `User '${id}' deleted successfully` };
  //  }



   async createStudentWithModerator(moderatorid: number, studentdata: StudentEntity): Promise<StudentEntity> {

    const moderator = await this.moderatorRepo.findOneBy({id:moderatorid})
    if (moderator  != null ){
      studentdata.moderator= moderator;
      return this.studentRepo.save(studentdata);
    }
    else{
      throw new Error('Moderator not found')
    }


   }




 

//delete moderator with id
   async deleteModeratorById(id: number){
    const result = await this.moderatorRepo.delete({id});

    if (result.affected===0) {
      throw new NotFoundException(`User with id '${id}' not found`);
      
   }
   else{
    return { message: `User with '${id}' deleted successfully` };
   }
  }

  //UpdatePhoneNumber

  async updatePhoneNumber(id: number, data:updatephnDTO){
    const user = await this.moderatorRepo.findOne({ where: { id} });
    if (!user) {
      throw new NotFoundException(`User with user '${id}' not found`);
    }
    else{
      user.phoneNumber = data.phonenumber; 
      return this.moderatorRepo.save(user);
    }

  }

  //update all
  async updateModeratorFull(id: number, data: PostReDto) {
    const moderator = await this.moderatorRepo.findOne({ where: { id } });
    if (!moderator) {
      throw new NotFoundException(`Moderator with id '${id}' not found`);
    }
  
    // Update all fields from DTO
    moderator.name = data.name;
    moderator.email = data.email;
    moderator.password = data.password; // optionally hash before saving
    moderator.phoneNumber = data.phoneNumber;
    moderator.fileName = data.fileName;
  
    return this.moderatorRepo.save(moderator);
  }
  


  async registerUser(dto: RegisterUsertDto): Promise<ResigterUserEntity> {

    
      const existing = await this.regRepo.findOne({ where: { email: dto.email } });
      if (existing) throw new  NotFoundException('Email already in use');
    
    
      const salt = await bcrypt.genSalt(10);
    
    
      const hashedPassword = await bcrypt.hash(dto.password, salt);
    
      const newUser = this.regRepo.create({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      });
    
      return this.regRepo.save(newUser);
    }




  
    
  



    async getAllStudentWithModerator(): Promise<ModeratorEntity[]>{
      return this.moderatorRepo.find({relations: ['student']});
  
     }


     getAllModeratorWithStudent(): Promise<StudentEntity[]>{
      return this.studentRepo.find({relations: ['moderator']})

     }
  
  
    
    

    




}






















// @Injectable()
// export class ProductService {
// constructor(
//  @InjectRepository(Product)
//  private productRepository: Repository<Product>,
//  @InjectRepository(Category)
//  private categoryRepository: Repository<Category>,
// ) {}
// async addProductToCategory(productId: number, categoryId: number): Promise<void> {
//  const product = await this.productRepository.findOneBy(productId);
//  const category = await this.categoryRepository.findOneBy(categoryId);
//  if (product && category) {
//   product.categories = [...product.categories, category];
//   await this.productRepository.save(product);
//  }
// }
// async removeProductFromCategory(productId: number, categoryId: number): Promise<void> {
//  const product = await this.productRepository.findOneBy(productId);
//  const category = await this.categoryRepository.findOneBy(categoryId);
//  if (product && category) {
//   product.categories = product.categories.filter((c) => c.id !== category.id);
//   await this.productRepository.save(product);
//  }
// }
// async getProductsWithCategories(): Promise<Product[]> {
//  return this.productRepository.find({ relations: ['categories'] });
// }
