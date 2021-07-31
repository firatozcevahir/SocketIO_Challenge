import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { UserDetailModel } from '@app/core/models/user-detail.model';
import { AuthService } from '@app/core/services/auth.service';
@Component({
  selector: 'app-day-buttons',
  templateUrl: './day-buttons.component.html',
  styleUrls: ['./day-buttons.component.scss']
})
export class DayButtonsComponent implements OnInit {

  @Input() data!: string;
  @Output() onOptionSelected = new EventEmitter();

  public dates: DateModel[] = [];

  public optionSelected = false;
  public selectedDay!: string;
  public userDetail!: UserDetailModel;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private authService: AuthService
  ) {
    this.userDetail = this.authService.getUserDetails();
  }

  ngOnInit(): void {
    const date = new Date(this.data);

    for (let i = 0; i < 7; i++) {
      const res = i === 0 ? new Date(date) : new Date(date.setDate(date.getDate() + 1));
      const day = res.getDay();
      if (day !== 6 && day !== 0) {
        this.dates.push({
          date: res,
          day: this.getDayName(res)
        });
      }
    }
  }

  private getDayName(date: Date): string {
    return date.toLocaleDateString(this.locale, { weekday: 'long' });
  }

  public selectDay(index: number): void {
    const date = this.dates[index];
    this.selectedDay = date.day;
    this.optionSelected = true;
    this.onOptionSelected.emit(date.date.toString());
  }
}


export class DateModel {
  public date!: Date;
  public day!: string;
}
