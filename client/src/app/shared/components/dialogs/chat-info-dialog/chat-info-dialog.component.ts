import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMANDS } from '@app/core/constants/base-constants';

@Component({
  selector: 'app-chat-info-dialog',
  templateUrl: './chat-info-dialog.component.html',
  styleUrls: ['./chat-info-dialog.component.scss']
})
export class ChatInfoDialogComponent implements OnInit {

  public commands = COMMANDS;
  constructor(
    public dialogRef: MatDialogRef<ChatInfoDialogComponent>
  ) { }

  ngOnInit(): void {
  }


  public selectCommand(cmd: string): void {
    this.dialogRef.close(cmd);
  }
}
