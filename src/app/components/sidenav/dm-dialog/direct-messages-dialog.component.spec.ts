import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDirectMessagesComponent } from './direct-messages-dialog.component';

describe('AllDirectMessagesComponent', () => {
  let component: AllDirectMessagesComponent;
  let fixture: ComponentFixture<AllDirectMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllDirectMessagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllDirectMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
