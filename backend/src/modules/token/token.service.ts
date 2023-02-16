import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { errors } from 'src/common/errors'
import { CreateTokenDto } from './dto'

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async generateJwtToken(user: CreateTokenDto): Promise<string> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const payload = { ...user }
			return this.jwtService.sign(payload, {
				secret: this.configService.get('jwt_secret'),
				expiresIn: this.configService.get('jwt_expire_time'),
			})
		} catch (e) {
			throw error
		}
	}
}
