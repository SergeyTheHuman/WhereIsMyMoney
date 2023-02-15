import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class UserLoginDto {
	@ApiProperty({
		example: 'test@gmail.com',
		description: 'Person email',
	})
	@IsString()
	@IsEmail()
	email: string
	
	@ApiProperty({
		example: 'secretPassword123',
		description: 'Person password',
	})
	@IsString()
	password: string
}