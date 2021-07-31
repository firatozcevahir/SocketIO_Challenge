import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  @Input() data!: L.LatLng;
  private map!: L.Map;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  ngAfterViewInit(): void {

    this.initMap();
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: this.data,
      zoom: 14,
    });

    L.tileLayer('	https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'SocketIO Challenge',
      maxZoom: 18,
      maxNativeZoom: 18
    }).addTo(this.map);

    const marker = L.marker(this.data)
      .bindPopup(`The server sent these coordinates ${this.data.lat} | ${this.data.lng}`)
      .addTo(this.map);
  }

}
