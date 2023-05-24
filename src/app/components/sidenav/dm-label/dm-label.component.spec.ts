import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmLabelComponent } from './dm-label.component';

describe('ChatLabelComponent', () => {
  let component: DmLabelComponent;
  let fixture: ComponentFixture<DmLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DmLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
