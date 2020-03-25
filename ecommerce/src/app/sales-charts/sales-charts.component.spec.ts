import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesChartsComponent } from './sales-charts.component';

describe('SalesChartsComponent', () => {
  let component: SalesChartsComponent;
  let fixture: ComponentFixture<SalesChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
