import { IsString } from "class-validator";

export class CreateUserDto {
	@IsString()
	firstName: string
	
	@IsString()
	username: string
	
	@IsString()
	email: string
	
	@IsString()
	password: string
}