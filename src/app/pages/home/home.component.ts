import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic.interface';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgxDataArray } from 'src/app/core/type/ngxDataArray.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public dataPC: NgxDataArray[] = [];
  viewPC: [number, number] = [700, 400];
  animationPC = true;
  colorSchemePC = 'cool';
  labelsPC = true;
  maxLabelLength = 20;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data) => {
      this.dataPC = this.olympicService.formatOlympicDataForNgxCharts(data);
    });
    console.log(this.olympics$);
  }
}
