import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInfoDialogComponent } from './chat-info-dialog.component';

describe('ChatInfoDialogComponent', () => {
  let component: ChatInfoDialogComponent;
  let fixture: ComponentFixture<ChatInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
