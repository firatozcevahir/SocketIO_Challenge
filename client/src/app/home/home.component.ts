import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { MessageOutputDto } from '@app/core/services/models/message-output-dto.model';
import { MessageViewModel } from '@app/core/services/models/message-view.model';
import { SocketConfigModel } from '@app/core/services/models/socket-config.model';
import { UserDetailModel } from '@app/core/services/models/user-detail.model';
import { SocketIOService } from '@app/core/services/socketio.service';
import { SocketIoConfig } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public config = new SocketConfigModel();

  public inputText: string = '';

  public inputRows: MessageViewModel [] = [];

  public userDetail: UserDetailModel;

  constructor(
    private socketService: SocketIOService,
    private authService: AuthService
  ) {
    this.userDetail = this.authService.getUserDetails();
    this.socketService.connect();
    this.socketService.onConnectionChange.subscribe((res) => {
      this.config = this.socketService.config;
    });

    this.socketService.onMessageReceived.subscribe((res) =>{
      const item = {
        author: res.author,
        message: res.message,
        command: res.command,
        isLeft: true
      };
      this.inputRows.push(item);
      console.log(item);
    });
  }

  ngOnInit(): void {
  }

  public toggleConnection(status: boolean): void {
    if (status) {
      this.socketService.connect();
    } else {
      this.socketService.disconnect()
    }
  }

  public handleCommand(): void {

    if(this.inputText === '' || !this.config.connected) {
      return;
    }

    const output: MessageOutputDto = {
      author: this.userDetail.userName,
      message: this.inputText,
      command: null
    };

    this.socketService.send(output);

    this.inputRows.push({
      author: output.author,
      message: output.message,
      command: null,
      isLeft: false
    });

    this.inputText ='';
  }

}
