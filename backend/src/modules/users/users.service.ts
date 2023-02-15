import { Injectable } from '@nestjs/common'
import { users } from 'src/mocks/users'

@Injectable()
export class UsersService {
	getUsers() {
		return users
	}
}
