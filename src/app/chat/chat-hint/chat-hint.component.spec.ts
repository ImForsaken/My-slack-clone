import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHintComponent } from './chat-hint.component';

describe('ChatHintComponent', () => {
  let component: ChatHintComponent;
  let fixture: ComponentFixture<ChatHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatHintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
