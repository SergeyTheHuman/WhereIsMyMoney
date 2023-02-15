import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TokenService, JwtService],
  controllers: [TokenController],
  exports: [TokenService]
})
export class TokenModule {}
