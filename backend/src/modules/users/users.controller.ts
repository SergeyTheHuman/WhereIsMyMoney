import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('create-user')
	async createUser(@Body() dto: CreateUserDto) {
		return this.usersService.createUser(dto)
	}

	@Get('get-all-users')
	async getUsers() {
		return this.usersService.getUsers()
	}
}
