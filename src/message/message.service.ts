import { Message } from './message.entity';
export class MessageService {
  public allMessages: Array<Message> = [];

  public insertNewMessage(message: Message): void {
    this.allMessages.push(message);
  }

  public getAllMessages(): Message[] {
    return this.allMessages;
  }
}
