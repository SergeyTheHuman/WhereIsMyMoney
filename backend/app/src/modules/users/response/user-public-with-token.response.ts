import { ApiProperty } from '@nestjs/swagger'

export class UserResponsePublicWithToken {
	@ApiProperty({ example: 'Dmitry', description: 'Person first name' })
	firstName: string

	@ApiProperty({
		example: 'Dmitry228killer228boss',
		description: 'Person username',
	})
	userName: string

	@ApiProperty({
		example: 'transformer@gmail.com',
		description: 'Person email',
	})
	email: string

	@ApiProperty({
		example: 'sdgfn4645yubfghj2asdflh5u6345njogdfug',
		description: 'Jwt token',
	})
	token: string
}
