// import {
//     Controller,
//     Post,
//     Body,
//     Res,
//     UsePipes,
//     ValidationPipe,
//     Req,
//     UnauthorizedException,
// } from '@nestjs/common';
// import type { Response } from 'express';
// import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/uniuser/uniuser.dto';
// import { LoginDto } from 'src/uniuser/login.dto';
// import *as cookieParser from 'cookie-parser';
// import type { Request } from 'express';





// @Controller('auth')
// export class AuthController {
//     constructor(private authService: AuthService) { }

//     @Post('login')
//     async login(
//         @Body() dto: LoginDto,
//         @Res({ passthrough: true }) res: Response,
//     ) {
//         const { accessToken, refreshToken } =
//             await this.authService.login(dto);

//         res.cookie('access_token', accessToken, {
//             httpOnly: true,
//             sameSite: 'strict',
//             maxAge: 15 * 60 * 1000,
//         });

//         res.cookie('refresh_token', refreshToken, {
//             httpOnly: true,
//             sameSite: 'strict',
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//         });

//         return { message: 'Login successful' };
//     }

//     @Post('refresh')
//     async refresh(
//         @Req() req: Request,
//         @Res({ passthrough: true }) res: Response,
//     ) {
//         const token = req.cookies?.refresh_token;
//         if (!token) throw new UnauthorizedException();

//         const payload = this.authService.verifyRefreshToken(token);
//         const accessToken = this.authService.generateTokens(payload.sub).accessToken;

//         res.cookie('access_token', accessToken, {
//             httpOnly: true,
//             sameSite: 'strict',
//             maxAge: 15 * 60 * 1000,
//         });

//         return { message: 'Token refreshed' };
//     }
// }


