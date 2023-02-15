import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'
import { errors } from 'src/common/errors'
import { CreateUserDto } from './dto'
import { User } from './models'
import { UserResponse, UserResponsePublic } from './response'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User,
	) {}

	async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 8)
	}

	async findUserByEmail(email: string): Promise<UserResponse> {
		return this.userRepository.findOne({
			where: {
				email,
			},
		})
	}

	async findUserByUserName(userName: string): Promise<UserResponse> {
		return this.userRepository.findOne({
			where: {
				userName,
			},
		})
	}

	async getUserPublic(email: string): Promise<UserResponsePublic> {
		return this.userRepository.findOne({
			where: {
				email,
			},
			attributes: {
				exclude: ['password'],
			},
		})
	}

	async createUser(dto: CreateUserDto): Promise<UserResponse> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)

		try {
			dto.password = await this.hashPassword(dto.password)

			const newUser = {
				firstName: dto.firstName,
				userName: dto.userName,
				email: dto.email,
				password: dto.password,
			}

			await this.userRepository.create(newUser)
			return dto
		} catch (e) {
			throw error
		}
	}

	async getUsers(): Promise<UserResponse[]> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			return this.userRepository.findAll({})
		} catch (e) {
			throw error
		}
	}
}
