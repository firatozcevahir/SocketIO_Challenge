import { Component } from '@angular/core';
import { SocketIOService } from './core/services/socketio.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'socketio-client';

  private i = 0;

   constructor(
    private socketIoService: SocketIOService
   ){ }
}
