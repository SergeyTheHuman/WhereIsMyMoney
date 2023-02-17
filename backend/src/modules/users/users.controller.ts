import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Patch,
	Req,
	UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/guards/jwt-guard'
import { UpdateUserDto, UpdateUserPasswordDto, UserFromRequestDto } from './dto'
import { UserResponsePublic } from './response'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [UserResponsePublic] })
	@UseGuards(JwtAuthGuard)
	@Get('get-all')
	@HttpCode(200)
	async getUsers(): Promise<UserResponsePublic[]> {
		return this.usersService.getUsers()
	}

	@ApiOperation({ summary: 'Update profile' })
	@ApiResponse({ status: 200, type: UserResponsePublic })
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Patch('update')
	async updateUser(
		@Body() dto: UpdateUserDto,
		@Req() request: Request,
	): Promise<UserResponsePublic> {
		const user = request.user as UserFromRequestDto

		return this.usersService.update(user.email, dto)
	}

	@ApiOperation({ summary: 'Update user password' })
	@ApiResponse({ status: 200, type: Boolean })
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Patch('update-password')
	async updateUserPassword(
		@Body() dto: UpdateUserPasswordDto,
		@Req() request: Request,
	): Promise<boolean> {
		const user = request.user as UserFromRequestDto

		return this.usersService.updatePassword(user.email, dto)
	}

	@ApiOperation({ summary: 'Delete profile' })
	@ApiResponse({ status: 200, type: Boolean })
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Delete('delete')
	async deleteUser(@Req() request: Request): Promise<boolean> {
		const user = request.user as UserFromRequestDto

		return this.usersService.delete(user.email)
	}
}
