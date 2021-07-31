import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { SocketIOService } from '@app/core/services/socketio.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private socketIOService: SocketIOService

  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.socketIOService.disconnect();
    this.authService.logout();
  }

}
