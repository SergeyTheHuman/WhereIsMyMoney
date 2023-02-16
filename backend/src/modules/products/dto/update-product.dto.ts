import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class UpdateProductDto {
	@ApiProperty({
		example: 'Milk',
		description: 'Product name',
	})
	@IsString()
	name: string

	@ApiProperty({
		example: '120',
		description: 'Product price',
	})
	@IsNumber()
	price: number
}
