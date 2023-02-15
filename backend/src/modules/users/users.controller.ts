import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { User } from './models'
import { UserResponse } from './response'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(JwtAuthGuard)
	@Get('get-all-users')
	@HttpCode(200)
	async getUsers(): Promise<UserResponse[]> {
		return this.usersService.getUsers()
	}
}
