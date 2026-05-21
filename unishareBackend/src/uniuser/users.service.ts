import { Injectable, BadRequestException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "./users.entity";
import { CreateUserDto } from "./uniuser.dto";

import { LoginDto } from "./login.dto";
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }
    //signUp
    async createUser(dto: CreateUserDto): Promise<User> {

        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestException("Passwords do not match");
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = this.userRepo.create({
            fullName: dto.fullName,
            email: dto.email,
            studentId: dto.studentId,
            password: hashedPassword,
        });
        try {

            return await this.userRepo.save(user);
        } catch (error: any) {
            // PostgreSQL unique constraint error
            if (error.code === "23505") {
                throw new ConflictException("Email already exists");
            }
            throw error;

        }
    }

    async login(dto: LoginDto) {
        // Find user by email,password
        const user = await this.userRepo.findOne({
            where: { email: dto.email },
            select: ["id", "fullName", "email", "studentId", "password"],
        });

        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid email or password");
        }




    }

    async findByEmail(email: string) {
        return this.userRepo.findOne({
            where: { email },
            select: ['id', 'fullName', 'email', 'studentId', 'password'],
        });
    }






}

