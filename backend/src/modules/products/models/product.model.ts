import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Category } from 'src/modules/categories/models'
import { User } from 'src/modules/users/models'

@Table({ tableName: 'Products' })
export class Product extends Model {
	@ApiProperty({ example: 1, description: 'Unique identifier' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 120, description: 'Product name' })
	@Column({
		type: DataType.STRING,
	})
	name: string

	@ApiProperty({ example: 120, description: 'Product price' })
	@Column({
		type: DataType.INTEGER,
	})
	price: number

	@ApiProperty({ example: 1, description: 'User id of the user who added this product' })
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		unique: false,
		allowNull: false,
	})
	user_id: number

	@BelongsTo(() => User)
	user: User

	@ApiProperty({ example: 1, description: 'Category id of this product' })
	@ForeignKey(() => Category)
	@Column({
		type: DataType.INTEGER,
		unique: false,
		allowNull: true,
	})
	category_id: number

	@BelongsTo(() => User)
	category: Category

}
