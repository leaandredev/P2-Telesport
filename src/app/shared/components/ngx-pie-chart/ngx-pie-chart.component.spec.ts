import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPieChartComponent } from './ngx-pie-chart.component';

describe('NgxPieChartComponent', () => {
  let component: NgxPieChartComponent;
  let fixture: ComponentFixture<NgxPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
