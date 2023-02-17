import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({ example: 'Dmitry', description: 'Person first name' })
	@IsString()
	firstName: string

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

	@ApiProperty({
		example: 'secretPassword123',
		description: 'Person password',
	})
	@MinLength(3, { message: 'Password is too short' })
	@IsString()
	password: string
}
