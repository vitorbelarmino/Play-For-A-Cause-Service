import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer() server: Server;
  @SubscribeMessage('newMessage')
  handleNewMessage(client: Socket) {
    this.server.emit('message');
  }
}
