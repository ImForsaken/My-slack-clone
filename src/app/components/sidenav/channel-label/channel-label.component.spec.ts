import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelLabelComponent } from './channel-label.component';

describe('ChannelLabelComponent', () => {
  let component: ChannelLabelComponent;
  let fixture: ComponentFixture<ChannelLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
