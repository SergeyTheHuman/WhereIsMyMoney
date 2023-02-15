import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import configurations from 'src/configurations'
import { AuthModule } from 'src/modules/auth/auth.module'
import { User } from 'src/modules/users/models/user.model'
import { UsersModule } from 'src/modules/users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

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
				models: [User],
			}),
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
