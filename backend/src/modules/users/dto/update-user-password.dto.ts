import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class UpdateUserPasswordDto {
	@ApiProperty({
		example: 'secretPass1',
		description: 'Person old password',
	})
	@IsString()
	@MinLength(3, { message: 'Password is too short' })
	oldPassword: string

	@ApiProperty({
		example: 'secretPass2',
		description: 'Person new password',
	})
	@IsString()
	@MinLength(3, { message: 'Password is too short' })
	newPassword: string
}
