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
   ){

    // this.socketIoService.hello().subscribe((res) =>{
    //   console.log(res);
    // });


    // setInterval(() =>{
    //   this.socketIoService.sendMessage(this.i);
    //   this.i++;
    // }, 200)
   }
}
