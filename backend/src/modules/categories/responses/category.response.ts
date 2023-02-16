import { ApiProperty } from '@nestjs/swagger'

export class CategoryResponse {
	@ApiProperty({
		example: 'Food',
		description: 'Category name',
	})
	name: string
}
