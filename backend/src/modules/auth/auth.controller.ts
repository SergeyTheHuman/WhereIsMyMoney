import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto';
import { User } from '../users/models/user.model';
import { UserResponse } from '../users/response';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register new user' })
	@ApiResponse({ status: 200, type: [CreateUserDto] })
	@Post('register')
	@HttpCode(200)
	register(@Body() dto: CreateUserDto): Promise<UserResponse> {
		return this.authService.register(dto)
	}
	
	@ApiOperation({ summary: 'Login in account' })
	@ApiResponse({ status: 200, type: [User] })
	@Post('login')
	@HttpCode(200)
	login(@Body() dto: UserLoginDto): Promise<UserResponse> {
		return this.authService.login(dto)
	}
}
