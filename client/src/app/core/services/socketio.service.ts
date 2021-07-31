import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { SocketStatusModel } from '@app/core/models/socket-status.model';
import { COMMANDS } from '@app/core/constants/base-constants';
import { MessageOutputDto as MessageOutputDto } from '@app/core/models/message-output-dto.model';
import { SnackbarService } from './snackbar.service';
import { OptionOutputDto } from '../models/option-output-dto.model';

@Injectable({ providedIn: 'root' })
export class SocketIOService {

  private api = environment.api;
  public config = new SocketStatusModel();
  private _socket: any;
  private commands = COMMANDS;

  public onConnectionChange = new Subject<boolean>();
  public onMessageReceived = new Subject<MessageOutputDto>();

  constructor(
    private http: HttpClient,
    private socket: Socket,
    private snackbarService: SnackbarService
  ) {
    this.socket.on('connect', () => {
      this.config.id = this._socket.id;
      this.config.connected = true;
      this.onConnectionChange.next(true);
      this.snackbarService.success(`Connected ${this.config.id}`);
    });

    this.socket.on('disconnect', () => {
      this.config.id = null;
      this.config.connected = false;
      this.onConnectionChange.next(false);
      this.snackbarService.error('Disconnected');
    });


    this.socket.on('msg-response', (response: MessageOutputDto) => {
      this.onMessageReceived.next(response);
    });
    this.socket.on('cmd-response', (response: MessageOutputDto) => {
      this.onMessageReceived.next(response);
    });
  }

  public hello(): Observable<any> {
    return this.http.get(`${this.api}/hello`);
  }

  public connect(): void {
    this._socket = this.socket.connect();
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public sendMessage(output: MessageOutputDto): void {
    const result = this.checkEventType(output.message);
    if (result) {
      this.socket.emit('command', output);
    } else {
      this.socket.emit('message', output);
    }
  }

  public sendOption(output: OptionOutputDto): void {
    this.socket.emit('option-select', output);
  }

  private checkEventType(msg: string): boolean {
    return this.commands.includes(msg);
  }
}
