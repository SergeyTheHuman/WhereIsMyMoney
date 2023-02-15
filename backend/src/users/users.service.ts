import { Injectable } from '@nestjs/common'
import { users } from '../mocks/users'

@Injectable()
export class UsersService {
	getUsers() {
		return users
	}
}
