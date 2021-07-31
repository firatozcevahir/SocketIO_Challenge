import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInfoDialogComponent } from './chat-info-dialog.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ChatInfoDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    ChatInfoDialogComponent
  ]
})
export class ChatInfoDialogModule { }
