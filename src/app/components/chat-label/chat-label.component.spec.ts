import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLabelComponent } from './chat-label.component';

describe('ChatLabelComponent', () => {
  let component: ChatLabelComponent;
  let fixture: ComponentFixture<ChatLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
