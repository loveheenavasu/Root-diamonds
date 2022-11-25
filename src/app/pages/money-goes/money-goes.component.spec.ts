import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyGoesComponent } from './money-goes.component';

describe('MoneyGoesComponent', () => {
  let component: MoneyGoesComponent;
  let fixture: ComponentFixture<MoneyGoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyGoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyGoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
