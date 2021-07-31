import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayButtonsComponent } from './day-buttons.component';

describe('DayButtonsComponent', () => {
  let component: DayButtonsComponent;
  let fixture: ComponentFixture<DayButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
