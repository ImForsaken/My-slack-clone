import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeorgComponent } from './georg.component';

describe('GeorgComponent', () => {
  let component: GeorgComponent;
  let fixture: ComponentFixture<GeorgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeorgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
