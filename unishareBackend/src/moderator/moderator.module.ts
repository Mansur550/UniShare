import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';
import { CreateContributorEntity, ModeratorEntity, UserEntity, ResigterUserEntity } from './moderator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { CommonUserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModeratorEntity, UserEntity, StudentEntity, CommonUserEntity, CreateContributorEntity, ResigterUserEntity])],
  controllers: [ModeratorController],
  providers: [ModeratorService]
})
export class ModeratorModule { }
