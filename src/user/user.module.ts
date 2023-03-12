import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService, UserGateway],
  exports: [UserService, UserGateway],
})
export class UserModule {}
