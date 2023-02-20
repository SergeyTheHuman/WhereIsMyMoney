import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../users/dto'
import { UserResponsePublicWithToken } from '../users/response'
import { AuthService } from './auth.service'
import { AuthUserLoginDto } from './dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Register new user' })
	@ApiResponse({ status: 200, type: UserResponsePublicWithToken })
	@Post('register')
	@HttpCode(200)
	register(@Body() dto: CreateUserDto): Promise<UserResponsePublicWithToken> {
		return this.authService.register(dto)
	}

	@ApiOperation({ summary: 'Login in account' })
	@ApiResponse({ status: 200, type: UserResponsePublicWithToken })
	@Post('login')
	@HttpCode(200)
	login(@Body() dto: AuthUserLoginDto): Promise<UserResponsePublicWithToken> {
		return this.authService.login(dto)
	}
}
