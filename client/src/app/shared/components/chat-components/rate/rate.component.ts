import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDetailModel } from '@app/core/models/user-detail.model';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  @Input() data: number[] = [];
  @Output() onOptionSelected = new EventEmitter();

  public optionSelected = false;

  public userDetail!: UserDetailModel;
  public option = 0;

  public rates: number[] = [];
  constructor(
    private authService: AuthService
  ) {
    this.userDetail = this.authService.getUserDetails();
  }

  ngOnInit(): void {

    for (let i = this.data[0]; i < this.data[1]; i++) {
      this.rates.push(i);
    }
  }

  public rateConversation(rate: number): void {
    this.optionSelected = true;
    this.option = rate;
    this.onOptionSelected.emit(this.option);
  }


}
