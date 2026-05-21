import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./uniuser.dto";
import { LoginDto } from "./login.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("signup")
    async signup(@Body() dto: CreateUserDto) {
        const user = await this.usersService.createUser(dto);

        return {
            message: "User created successfully",
            userId: user.id,
        };
    }

    @Post("login")
    async login(@Body() dto: LoginDto) {
        const user = await this.usersService.login(dto);

        return {
            message: "Login successful",
            user,
        };
    }

}
