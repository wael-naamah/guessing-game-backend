import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AlertService } from 'src/alert/alert.service';
import { MessageGateway } from 'src/message/message.gateway';
import { getTime } from 'src/utils/utils';
import { User } from './user.entity';
import { UserService } from './user.service';

@WebSocketGateway()
export class UserGateway {
  private user: User;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private messageGateway: MessageGateway,
  ) {}

  @SubscribeMessage('enteredUser')
  enteredUser(client: Socket, user: User): void {
    const newUser = new User(
      client.id,
      user.name,
      user.color,
      getTime(),
      user?.avatar,
    );
    client.emit('registeredWithID', client.id);
    this.userService.insertNewUser(newUser);
    this.updateUserList(client);
    this.messageGateway.sendAllMessages(client);
    this.alertService.newUserAlert(client);
    this.alertService.sendWelcomeMesage(client, newUser.name);
  }

  public userExit(client: Socket): void {
    const outgoingUser = this.userService.getUser(client.id);
    if (outgoingUser) {
      outgoingUser.time = getTime();
      this.userService.userExit(client.id);
      this.alertService.outgoingUserAlert(outgoingUser);
      this.updateUserList(client);
    }
  }

  public updateUserData(client: Socket, user: User): void {
    const userExist = this.userService.getUser(user.id);
    if (userExist) {
      user.time = getTime();
      this.userService.updateUserData(user);
      this.updateUserList(client);
    }
  }

  private updateUserList(client: Socket) {
    const allUsers = this.userService.getAllUsers();
    this.alertService.updateUserList(client, allUsers);
  }
}
