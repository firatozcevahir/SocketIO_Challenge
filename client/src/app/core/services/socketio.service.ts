import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({providedIn: 'root'})
export class SocketIOService {

  private api = environment.api;
  constructor(
    private http: HttpClient,
    private socket: Socket
  ) {}

  public hello(): Observable<any> {
    return this.http.get(`${this.api}/hello`);
  }

  public sendMessage(i: number): void {
    this.socket.emit('sendMessage', 'test Message from client ' + i);
    this.socket.on('response', (res: any) =>{
      console.log(res);
    });
  }



}
