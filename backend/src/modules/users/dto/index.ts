import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsString()
	firstName: string

	@MinLength(3, { message: 'Username is too short' })
	@MaxLength(35, { message: 'Username is too long' })
	@IsString()
	userName: string

	@IsString()
	@IsEmail()
	email: string

	@IsString()
	password: string
}
