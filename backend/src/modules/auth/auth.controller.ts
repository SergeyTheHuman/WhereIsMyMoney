import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
		return this.authService.register(dto)
	}

	@Post('login')
	login(@Body() dto: UserLoginDto): Promise<CreateUserDto> {
		return this.authService.login(dto)
	}
}
