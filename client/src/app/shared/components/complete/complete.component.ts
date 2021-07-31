import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  @Input() data!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
