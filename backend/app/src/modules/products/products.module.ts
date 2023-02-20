import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from '../users/users.module'
import { Product } from './models'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
	imports: [SequelizeModule.forFeature([Product]), UsersModule],
	providers: [ProductsService],
	controllers: [ProductsController],
})
export class ProductsModule {}
