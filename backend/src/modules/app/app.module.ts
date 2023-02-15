import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configurations from 'src/configurations'
import { UsersModule } from 'src/modules/users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configurations],
		}),
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
