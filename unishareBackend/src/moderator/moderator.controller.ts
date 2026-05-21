import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { ModeratorService} from './moderator.service';
import { CreateContributorDTO, CreateUserDto, PostReDto, RegisterUsertDto, updatephnDTO } from './moderator.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { CreateContributorEntity, ModeratorEntity } from './moderator.entity';
import { StudentEntity } from 'src/student/student.entity';
import { CommonUserEntity } from 'src/user/user.entity';

@Controller('moderator')
export class ModeratorController {

    constructor(private readonly moderatorService: ModeratorService) {}

    
    @Get()
    getHello(){
        return this.moderatorService.getHello();
    }

    @Get('getResource/:id')
    getResource(@Param('id') id: number): object {
    return this.moderatorService.getResource(id);
  }
///////////////////////////OneToOne
  
  @Post('createuser')
  async createUser(
    @Body() body: { commonUser: CommonUserEntity; contributor: CreateContributorEntity },
  ) {
    return this.moderatorService.createCommonUser(body.commonUser, body.contributor);
  }
///////////////////////

  @Get('getbyid/:id')
  getById(@Param('id') id: number): object {
    return this.moderatorService.getById(id);
  }


  // @Post('upload_file')
  // postReasource(@Body() postRe: PostReDto){
  //    const upload = this.moderatorService.newPost(postRe);
  //    return upload;


  // }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        
        if (file.originalname.match(/^.*\.pdf$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Imgae only'), false);
          
        }
      },
      limits: { fileSize: 5*1024*1024 }, // max size
      storage: diskStorage({
        destination: './src/moderator/uploads', 
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )

  postReasource(@Body() postRe: PostReDto,
  @UploadedFile() file: Express.Multer.File): object {
    console.log(postRe.originalname);
    postRe.fileName=postRe.fileName;

    return this.moderatorService.createPost(postRe);
     
    
   
  }

  @Get('listall')
  getDetails(): object {
    return this.moderatorService.getDetails();
  }


  //LabTask-3

  @Post("create")
  create(@Body() data: CreateUserDto) {
    return this.moderatorService.createUser(data);
  }

  
  @Get("search")
  search(@Query("name") name: string) {
    return this.moderatorService.searchByFullName(name);
  }

  


  // Delete user 
//   @Delete(":username")
//   deleteUser(@Param("username") username: string) {
//   return this.moderatorService.deleteByUsername(username);
// }


@Patch(":username/status")
updateStatus(
  @Param("username") username: string,
  @Body("isActive") isActive: boolean
) {
  return this.moderatorService.updateStatus(username, isActive);
}






//CreateStudentWithmoderator(OneTomany Example)
@Post('createstudentwithmoderator/:moderatorid')
createStudentWithModerator(@Param('moderatorid') id: number, @Body() studentdata: StudentEntity): object {
  return this.moderatorService.createStudentWithModerator(id, studentdata)

}





//delete Moderator
@Delete("delete/:id")
deleteModerator(@Param("id") id: number) {
return this.moderatorService.deleteModeratorById(id);
}



@Patch("updatephn/:id")
updatePhoneNumber(@Param("id") id: number,@Body() data: updatephnDTO){
  return this.moderatorService.updatePhoneNumber(id, data);
}


@Put('update-full/:id')
updateModeratorFull(
  @Param('id') id: number,
  @Body() data: PostReDto
) {
  return this.moderatorService.updateModeratorFull(id, data);
}











//find user by username
@Get(":username")
findByUsername(@Param("username") username: string) {
  return this.moderatorService.getByUsername(username);
}




@Get(":id")
findById(@Param("id") id: number) {
  return this.moderatorService.getById(id);
}


@Post('register/')
register(@Body() dto: RegisterUsertDto) {
  return this.moderatorService.registerUser(dto);
}

@Get('listallstudentwithmoderator/:id')
getAllStudentWithModerator(@Param("id") id: number): Promise<ModeratorEntity[]>{
  return this.moderatorService.getAllStudentWithModerator()
}

@Get('getallmoderator/listallmoderatorwithstudent/')
getAllModeratorwithStudent(): Promise<StudentEntity[]>{
  return this.moderatorService.getAllModeratorWithStudent()

}


  

   
}













//  // ------------------------
//   // Add product to category
//   // ------------------------
//   @Post(':productId/categories/:categoryId')
//   addProductToCategory(
//     @Param('productId') productId: number,
//     @Param('categoryId') categoryId: number,
//   ) {
//     return this.productService.addProductToCategory(productId, categoryId);
//   }


//   // Remove product from category
//   // ------------------------
//   @Delete(':productId/categories/:categoryId')
//   removeProductFromCategory(
//     @Param('productId') productId: number,
//     @Param('categoryId') categoryId: number,
//   ) {
//     return this.productService.removeProductFromCategory(productId, categoryId);
//   }


//   // Get all products with categories
//   // ------------------------
//   @Get()
//   getProductsWithCategories() {
//     return this.productService.getProductsWithCategories();
//   }
















// return {
//   message: 'PDF uploaded successfully!',
//   fileName: file.filename,
//   path: file.path,
//   size: file.size + ' bytes',
// };











// @Post('upload')
// @UseInterceptors(
//   FileInterceptor('file', {
//     fileFilter: (req, file, cb) => {
//       // Allow only .pdf files
//       if (file.originalname.match(/^.*\.pdf$/)) {
//         cb(null, true);
//       } else {
//         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
//       }
//     },
//     limits: { fileSize: 5 * 1024 * 1024 }, // optional: 5MB max
//     storage: diskStorage({
//       destination: './src/moderator/uploads', 
//       filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//       },
//     }),
//   }),
// )
// uploadFile(@UploadedFile() file: Express.Multer.File) {
//   return {
//     message: 'PDF uploaded successfully!',
//     fileName: file.filename,
//     path: file.path,
//     size: file.size + ' bytes',
//   };
// }



















  // @Patch('updatepassword/:id')
  // updatePassword(
  //   @Param('id') id: number,
  //   @Body('password') password: string,
  // ): object{
  //   return this.moderatorService.updatePassword(id, password);
  // }


 
    


