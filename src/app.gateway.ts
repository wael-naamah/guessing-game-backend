import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { intervalBeforeSending } from './decorators/interval-before-sending';
import { MessageService } from './message/message.service';
import { UserGateway } from './user/user.gateway';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private userGateway: UserGateway,
    private messageService: MessageService,
  ) {}

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): void {
    this.logger.log('Websocket-chat initialized');
  }

  @intervalBeforeSending
  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.userGateway.userExit(client);
  }
}
