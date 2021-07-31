export class SocketConfigModel {
  public id: string | null;
  public connected: boolean;

  constructor() {
    this.id = null;
    this.connected = false;
  }
}
