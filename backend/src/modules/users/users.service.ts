import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'
import { where } from 'sequelize'
import { errors } from 'src/common/errors'
import { users } from 'src/mocks/users'
import { CreateUserDto } from './dto'
import { User } from './models/user.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User,
	) {}

	async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 8)
	}

	async findUserByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				email,
			},
		})
	}

	async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
		try {
			const existUser = await this.findUserByEmail(dto.email)
			if (!!existUser) throw new BadRequestException(errors.USER_EXIST)

			dto.password = await this.hashPassword(dto.password)

			const newUser = {
				firstName: dto.firstName,
				userName: dto.userName,
				email: dto.email,
				password: dto.password,
			}

			await this.userRepository.create(newUser)
			return dto
		} catch (error) {
			// TODO: Разобраться с ошибками (как их менять правильно?)
			if (error.message) {
				throw error
			} else {
				throw new InternalServerErrorException(errors.SOMETHING_WRONG)
			}
		}
	}

	async getUsers() {
		return users
	}
}
