import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class ProductResponse {
	@ApiProperty({
		example: '2',
		description: 'Product id',
	})
	@IsNumber()
	id: number
	
	@ApiProperty({
		example: 'Milk',
		description: 'Product name',
	})
	name: string

	@ApiProperty({
		example: '120',
		description: 'Product price',
	})
	price: number
	
	@ApiProperty({
		example: '2',
		description: 'Category id',
	})
	@IsNumber()
	category_id: number
}