import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'
import { errors } from 'src/common/errors'
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dto'
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

	async getUserIdByEmail(email: string): Promise<number> {
		const user = await this.userRepository.findOne({
			where: {
				email,
			},
		})
		return user.id
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

	async createUser(dto: CreateUserDto): Promise<UserResponsePublic> {
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
			delete dto.password

			return dto
		} catch (e) {
			throw error
		}
	}

	async getUsers(): Promise<UserResponsePublic[]> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			return this.userRepository.findAll({
				attributes: {
					exclude: ['password'],
				},
			})
		} catch (e) {
			throw error
		}
	}

	async update(
		email: string,
		dto: UpdateUserDto,
	): Promise<UserResponsePublic> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			await this.userRepository.update(dto, { where: { email } })
			return dto
		} catch (e) {
			throw error
		}
	}

	async updatePassword(
		email: string,
		dto: UpdateUserPasswordDto,
	): Promise<boolean> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			if (dto.newPassword === dto.oldPassword) {
				error = new BadRequestException(errors.PASSWORDS_ARE_SAME)
				throw new Error()
			}

			const existUser = await this.findUserByEmail(email)
			if (!existUser) {
				error = new NotFoundException(errors.USER_NOT_FOUND)
				throw new Error()
			}

			const isPasswordCorrect = await bcrypt.compare(
				dto.oldPassword,
				existUser.password,
			)
			if (!isPasswordCorrect) {
				error = new BadRequestException(errors.WRONG_PASSWORD)
				throw new Error()
			}

			const newPassword = await this.hashPassword(dto.newPassword)

			return !!this.userRepository.update(
				{ password: newPassword },
				{ where: { email } },
			)
		} catch (e) {
			throw error
		}
	}

	async delete(email: string): Promise<boolean> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			return !!this.userRepository.destroy({ where: { email } })
		} catch (e) {
			throw error
		}
	}
}
