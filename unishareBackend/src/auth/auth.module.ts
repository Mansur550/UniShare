import { JwtModule } from "@nestjs/jwt";
//import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { User } from "src/uniuser/users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    // controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: 'REFRESH_SECRET',
            useValue: process.env.JWT_REFRESH_SECRET,
        },
    ],
    exports: [AuthService],
})
export class AuthModule { }
