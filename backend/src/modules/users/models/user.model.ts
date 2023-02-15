import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'Users' })
export class User extends Model {
	@ApiProperty({ example: 1, description: 'Unique identifier' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'Dmitry', description: 'Person first name' })
	@Column({
		type: DataType.STRING,
	})
	firstName: string

	@ApiProperty({
		example: 'Dmitry228killer228boss',
		description: 'Person username',
	})
	@Column({
		type: DataType.STRING,
		unique: true,
	})
	userName: string

	@ApiProperty({
		example: 'transformer@gmail.com',
		description: 'Person email',
	})
	@Column({
		type: DataType.STRING,
		unique: true,
	})
	email: string

	@ApiProperty({
		example: 'sdgfn4645yubfghj2',
		description: 'Hashed password',
	})
	@Column({
		type: DataType.STRING,
	})
	password: string
}
