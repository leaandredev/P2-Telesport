import { Component, Input, OnInit } from '@angular/core';
import { NgxDataArray } from '../../type/ngxDataArray.type';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-ngx-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './ngx-pie-chart.component.html',
  styleUrl: './ngx-pie-chart.component.scss',
})
export class NgxPieChartComponent {
  @Input() dataPC: NgxDataArray[] = [];

  animationPC = true;
  colorSchemePC = 'cool';
  labelsPC = true;
  maxLabelLength = 20;
}
