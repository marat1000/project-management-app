import { io, Socket } from 'socket.io-client';

export default class ClientSocket {
  socket: Socket | null | undefined;

  async connect() {
    this.socket = io('ws://localhost:5000');
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit<T>(eventName: string, data: T) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  on<T>(eventName: string, func: (data: T) => void) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
