import { IsEmail, IsString, IsAlpha, IsStrongPassword, IsMobilePhone, IsNumber, IsNotEmpty, MinLength } from "class-validator";
import { IsNull } from "typeorm/browser";
// import { IsPassword } from "node_modules/@samofprog/nestjs-password-validator/dist/types";



export class CreateModeratorDTO {
  
    
    
    name: string;
    
    username: string;
    
    password: string;
  }

  export class AddItemDTO {
    id: string;
    name: string;
    status: string;
  }
 
  export class CreateContributorDTO{
    @IsString()
    name:string;
    @IsEmail()
    email:string;
    @IsNumber()
    age: number;
}

export class PostReDto{
  originalname(originalname: any) {
    throw new Error('Method not implemented.');
  }
 

  @IsAlpha()
  name: string;

  @IsEmail()
  email:string;



  // @IsPassword({
  //   hasSpecialChars: {enabled: true}
  // })
  @IsStrongPassword({minLength: 6, minUppercase:1, minLowercase:1,minNumbers:1, minSymbols:1})
  password: string;

  //file: string;

  fileName: string;
  
  @IsMobilePhone('bn-BD')
  phoneNumber: string;



}

export class updatephnDTO{
  
  phonenumber:string;
}

//Lab Task-3

export class CreateUserDto {

  username: string;
  fullName: string;
  isActive?: boolean;
}

///Regsister User 
export class RegisterUsertDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}