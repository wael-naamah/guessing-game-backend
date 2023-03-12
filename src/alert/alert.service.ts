/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from 'src/user/user.entity';
import { AlertGateway } from './alert.gateway';

@Injectable()
export class AlertService {
  constructor(private alertGateway: AlertGateway) {}

  public sendWelcomeMesage(client: Socket, userName: string): void {
    const welcomeMessage = `Welcome, ${userName}! 👋`;
    this.alertGateway.sendWelcomeMesage(client, welcomeMessage);
  }

  public updateUserList(client: Socket, allUsers: User[]): void {
    this.alertGateway.updateUserList(client, allUsers);
  }

  public newUserAlert(client: Socket): void {
    this.alertGateway.newUserAlert(client);
  }

  public reconnectedUserAlert(client: Socket, reconnectedUser: User): void {
    const reconnectedUserAlert = `reconnect to chat`;
    this.alertGateway.reconnectedUserAlert(
      client,
      reconnectedUser,
      reconnectedUserAlert,
    );
  }

  public outgoingUserAlert(client: User): void {
    const outgoingUser = client;
    this.alertGateway.outgoingUserAlert(outgoingUser);
  }
}
