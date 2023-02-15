import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateTokenDto {
	@ApiProperty({
		example: 'Dmitry228killer228boss',
		description: 'Person username',
	})
	@MinLength(3, { message: 'Username is too short' })
	@MaxLength(35, { message: 'Username is too long' })
	@IsString()
	userName: string

	@ApiProperty({
		example: 'transformer@gmail.com',
		description: 'Person email',
	})
	@IsString()
	@IsEmail()
	email: string
}
