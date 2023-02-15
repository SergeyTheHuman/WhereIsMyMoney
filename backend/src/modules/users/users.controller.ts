import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { CreateUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('get-all-users')
	@HttpCode(200)
	async getUsers() {
		return this.usersService.getUsers()
	}
}
