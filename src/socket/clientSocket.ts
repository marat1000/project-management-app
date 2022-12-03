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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(eventName: string, data: any) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  onAny() {
    if (this.socket) {
      this.socket?.onAny((message, arg) => {
        console.log('ANY:', message, arg);
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(eventName: string, func: (data: any) => void) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
