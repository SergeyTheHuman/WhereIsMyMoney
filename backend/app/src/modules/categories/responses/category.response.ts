import { ApiProperty } from '@nestjs/swagger'

export class CategoryResponse {
	@ApiProperty({
		example: '2',
		description: 'Category id',
	})
	id: number

	@ApiProperty({
		example: 'Food',
		description: 'Category name',
	})
	name: string
}
