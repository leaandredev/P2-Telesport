import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() dataPieChart: NgxDataArray[] = [];
  @Output() selectedCountry: EventEmitter<string> = new EventEmitter();

  animationPieChart: boolean = true;
  colorSchemePC: string = 'cool';
  labelsPieChart: boolean = true;
  maxLabelLength: number = 20;

  onCountrySelect(countryData: any): void {
    this.selectedCountry.emit(countryData.name);
  }
}
