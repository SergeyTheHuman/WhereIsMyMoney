import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import configurations from 'src/configurations'
import { AuthModule } from 'src/modules/auth/auth.module'
import { User } from 'src/modules/users/models'
import { UsersModule } from 'src/modules/users/users.module'
import { CategoriesModule } from '../categories/categories.module'
import { Category } from '../categories/models'
import { Product } from '../products/models'
import { ProductsModule } from '../products/products.module'
import { TokenModule } from '../token/token.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configurations],
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				dialect: configService.get('db_dialect'),
				host: configService.get('db_host'),
				port: configService.get('db_port'),
				username: configService.get('db_user'),
				password: configService.get('db_password'),
				database: configService.get('db_database'),
				synchronize: true,
				autoLoadModels: true,
				models: [User, Product, Category],
			}),
		}),
		UsersModule,
		AuthModule,
		TokenModule,
		ProductsModule,
		CategoriesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
