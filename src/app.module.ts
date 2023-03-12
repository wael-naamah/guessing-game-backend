import { Module } from '@nestjs/common';
import { AlertGateway } from './alert/alert.gateway';
import { AlertService } from './alert/alert.service';
import { AppGateway } from './app.gateway';
import { MessageGateway } from './message/message.gateway';
import { MessageService } from './message/message.service';
import { UserGateway } from './user/user.gateway';
import { UserService } from './user/user.service';

@Module({
  controllers: [],
  providers: [
    AppGateway,
    UserService,
    UserGateway,
    MessageService,
    MessageGateway,
    AlertService,
    AlertGateway,
  ],
  imports: [],
})
export class AppModule {}
