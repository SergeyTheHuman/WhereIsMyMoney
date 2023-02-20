import { Module } from '@nestjs/common'
import { JwtStrategy } from 'src/strategy'
import { TokenModule } from '../token/token.module'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	imports: [UsersModule, TokenModule],
})
export class AuthModule {}
