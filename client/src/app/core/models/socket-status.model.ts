export class SocketStatusModel {
  public id: string | null;
  public connected: boolean;

  constructor() {
    this.id = null;
    this.connected = true;
  }
}
