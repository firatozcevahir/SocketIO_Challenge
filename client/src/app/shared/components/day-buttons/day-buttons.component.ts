import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
@Component({
  selector: 'app-day-buttons',
  templateUrl: './day-buttons.component.html',
  styleUrls: ['./day-buttons.component.scss']
})
export class DayButtonsComponent implements OnInit {

  @Input() data!: string;
  public dates: {
    date: Date,
    day: string
  }[] = [];

  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit(): void {
    const date = new Date(this.data);

    for (let i = 0; i < 7; i++) {
      const res = i === 0 ?new Date(date) : new Date(date.setDate(date.getDate() + 1));
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

  public selectDay(date: Date): void {
    console.log('selectedDate', date);
  }
}
