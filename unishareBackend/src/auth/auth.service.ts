import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "src/uniuser/login.dto";
import { User } from "src/uniuser/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
        @Inject('REFRESH_SECRET') private refreshSecret: string,
    ) { }

    async login(dto: LoginDto) {
        const user = await this.userRepo.findOne({
            where: { email: dto.email },
            select: ['id', 'email', 'password'],
        });

        if (!user) throw new UnauthorizedException();

        const ok = await bcrypt.compare(dto.password, user.password);
        if (!ok) throw new UnauthorizedException();

        return this.generateTokens(user.id);
    }

    generateTokens(userId: number) {
        const payload = { sub: userId };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '15m',
            secret: process.env.JWT_SECRET,
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: this.refreshSecret,
        });

        return { accessToken, refreshToken };
    }

    verifyRefreshToken(token: string) {
        return this.jwtService.verify(token, {
            secret: this.refreshSecret,
        });
    }
}

