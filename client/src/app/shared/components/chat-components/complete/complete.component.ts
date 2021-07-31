import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDetailModel } from '@app/core/models/user-detail.model';
import { AuthService } from '@app/core/services/auth.service';
import { SocketIOService } from '@app/core/services/socketio.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  @Input() data: string[] = [];
  @Output() onOptionSelected = new EventEmitter();

  public optionSelected = false;
  public option = false;
  public userDetail!: UserDetailModel;

  constructor(
    private authService: AuthService,
    private socketService: SocketIOService
  ) {
    this.userDetail = this.authService.getUserDetails();
  }

  ngOnInit(): void {
  }


  public handleConnection(status: number): void {
    this.optionSelected = true;
    this.option = status === 0 ? true : false
    this.onOptionSelected.emit(this.option);
  }

}
