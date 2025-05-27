import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxLineData } from 'src/app/core/types/ngxLineData.type';

@Component({
  selector: 'app-ngx-line-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './ngx-line-chart.component.html',
  styleUrl: './ngx-line-chart.component.scss',
})
export class NgxLineChartComponent {
  @Input() dataLineChart: NgxLineData[] = [];

  animationLineChart: boolean = true;
  colorSchemePC: string = 'cool';
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
}
