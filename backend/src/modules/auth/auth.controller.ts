import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto';
import { UserResponse, UserResponsePublic, UserResponsePublicWithToken, UserResponseWithToken } from '../users/response';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register new user' })
	@ApiResponse({ status: 200, type: UserResponsePublic })
	@Post('register')
	@HttpCode(200)
	register(@Body() dto: CreateUserDto): Promise<UserResponsePublic> {
		return this.authService.register(dto)
	}
	
	@ApiOperation({ summary: 'Login in account' })
	@ApiResponse({ status: 200, type: UserResponsePublicWithToken })
	@Post('login')
	@HttpCode(200)
	login(@Body() dto: UserLoginDto): Promise<UserResponsePublicWithToken>  {
		return this.authService.login(dto)
	}
}
