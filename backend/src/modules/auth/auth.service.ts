import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { errors } from 'src/common/errors'
import { TokenService } from '../token/token.service'
import { CreateUserDto } from '../users/dto'
import { UserResponse, UserResponseWithToken } from '../users/response'
import { UsersService } from '../users/users.service'
import { UserLoginDto } from './dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly tokenService: TokenService,
	) {}

	async login(dto: UserLoginDto): Promise<UserResponseWithToken> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const existUser = await this.usersService.findUserByEmail(dto.email)

			if (!existUser) {
				error = new NotFoundException(errors.USER_NOT_FOUND)
				throw new Error()
			}

			const isPasswordCorrect = await bcrypt.compare(
				dto.password,
				existUser.password,
			)
			if (!isPasswordCorrect) {
				error = new BadRequestException(errors.WRONG_PASSWORD)
				throw new Error()
			}

			const token = await this.tokenService.generateJwtToken({
				email: existUser.email,
				userName: existUser.userName,
			})

			return { ...existUser, token }
		} catch (e) {
			throw error
		}
	}

	async register(dto: CreateUserDto): Promise<UserResponse> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)

		try {
			const emailExists = await this.usersService.findUserByEmail(dto.email)

			if (!!emailExists) {
				error = new BadRequestException(errors.EMAIL_EXIST)
				throw new Error()
			}

			const userNameExists = await this.usersService.findUserByUserName(
				dto.userName,
			)
			if (!!userNameExists) {
				error = new BadRequestException(errors.USERNAME_EXIST)
				throw new Error()
			}

			return this.usersService.createUser(dto)
		} catch (e) {
			throw error
		}
	}
}
