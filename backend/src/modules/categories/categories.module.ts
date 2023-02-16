import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from '../users/users.module'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { Category } from './models'

@Module({
	imports: [SequelizeModule.forFeature([Category]), UsersModule],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
