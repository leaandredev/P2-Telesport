import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPieData } from '../../../core/type/ngxPieData.type';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-ngx-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './ngx-pie-chart.component.html',
  styleUrl: './ngx-pie-chart.component.scss',
})
export class NgxPieChartComponent {
  @Input() dataPieChart: NgxPieData[] = [];
  @Output() selectedCountry: EventEmitter<string> = new EventEmitter();

  animationPieChart: boolean = true;
  colorSchemePC: string = 'cool';
  labelsPieChart: boolean = true;
  maxLabelLength: number = 20;

  onCountrySelect(countryData: any): void {
    this.selectedCountry.emit(countryData.name);
  }
}
