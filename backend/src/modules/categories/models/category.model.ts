import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/modules/users/models'

@Table({ tableName: 'Categories' })
export class Category extends Model {
	@ApiProperty({ example: 1, description: 'Unique identifier' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 120, description: 'Category name' })
	@Column({
		type: DataType.STRING,
	})
	name: string

	@ApiProperty({ example: 1, description: 'User id of the user who added this category' })
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		unique: false,
		allowNull: false,
	})
	user_id: number

	@BelongsTo(() => User)
	user: User
}
