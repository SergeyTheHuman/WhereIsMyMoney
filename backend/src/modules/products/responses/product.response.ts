import { ApiProperty } from "@nestjs/swagger"

export class ProductResponse {
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
}