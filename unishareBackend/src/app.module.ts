import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModeratorModule } from './moderator/moderator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './uniuser/users.controller';
import { UsersService } from './uniuser/users.service';
import { UsersModule } from './uniuser/users.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [ModeratorModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'moderator',
    autoLoadEntities: true,
    synchronize: true
  }),
    UsersModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
