import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { MessageOutputDto } from '@app/core/models/message-output-dto.model';
import { MessageViewModel } from '@app/core/models/message-view.model';
import { SocketStatusModel } from '@app/core/models/socket-status.model';
import { UserDetailModel } from '@app/core/models/user-detail.model';
import { SocketIOService } from '@app/core/services/socketio.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatInfoDialogComponent } from '@app/shared/components/dialogs/chat-info-dialog/chat-info-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {


  @ViewChild('chatPanelEl') private chatPanelEl!: ElementRef;
  @ViewChild('inputTextEl') private inputEl!: ElementRef;


  public socket = new SocketStatusModel();
  public inputText: string = '';

  public inputRows: MessageViewModel[] = [];
  public userDetail: UserDetailModel;

  constructor(
    private socketService: SocketIOService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.userDetail = this.authService.getUserDetails();
    this.socketService.connect();
    this.socketService.onConnectionChange.subscribe((res) => {
      this.socket = this.socketService.config;
      if (!res) {
        //  disconnected
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.socketService.onMessageReceived.subscribe((res) => {
      const item = {
        author: res.author,
        message: res.message,
        command: res.command,
        isLeft: true
      };
      this.inputRows.push(item);
      console.log(item);
      setTimeout(() =>{
        this.chatPanelEl.nativeElement.scrollTop = this.chatPanelEl.nativeElement.scrollHeight;
      });
    });
  }

  public toggleConnection(status: boolean): void {
    if (status) {
      this.socketService.connect();
    } else {
      this.socketService.disconnect();
    }
  }

  public handleCommand(): void {

    if (this.inputText === '' || !this.socket.connected) {
      return;
    }

    const output: MessageOutputDto = {
      userId: this.userDetail.id,
      author: this.userDetail.userName,
      message: this.inputText,
      command: null
    };

    this.socketService.sendMessage(output);
    this.inputRows.push({
      author: output.author,
      message: output.message,
      command: null,
      isLeft: false
    });

    this.inputText = '';
  }

  public onDayOptionSelected(date: string): void {
    this.socketService.sendOption({
      userId: this.userDetail.id,
      option: date,
      type: 'date'
    });
  }

  public onCompleteOptionSelected(status: boolean): void {
    this.socketService.sendOption({
      userId: this.userDetail.id,
      option: status,
      type: 'complete'
    });
    if (status) {
      this.toggleConnection(!status);
    }
  }

  public onRateOptionSelected(rate: number): void {
    this.socketService.sendOption({
      userId: this.userDetail.id,
      option: rate,
      type: 'rate'
    });
  }

  public clearChat(): void {
    this.inputRows = [];
  }

  public showInfo(): void {
    this.dialog.open(ChatInfoDialogComponent, {
      width: '450px',
      hasBackdrop: true,
      autoFocus: false
    }).afterClosed().subscribe(res => {
      if (res) {
        this.inputText = res;
        this.inputEl.nativeElement.focus();
      }
    });
  }
}
