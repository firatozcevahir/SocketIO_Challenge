import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/core/services/auth.service';
import { SocketIOService } from '@app/core/services/socketio.service';
import { ConfirmDialogComponent } from '@app/shared/components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private socketIOService: SocketIOService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      data: {
        title: 'Logging Out'
      },
      autoFocus: false
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.socketIOService.disconnect();
        this.authService.logout();
      }
    });
  }
}
