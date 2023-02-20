import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtStrategy } from 'src/strategy'
import { User } from './models'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [SequelizeModule.forFeature([User])],
	providers: [UsersService, JwtStrategy],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
