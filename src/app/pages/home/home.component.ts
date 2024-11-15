import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  public dataPieChart: NgxDataArray[] = [];
  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;
  public errorMessage: string | null = null;
  public loading: boolean = false;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;

    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe({
      next: (data) => {
        this.dataPieChart =
          this.olympicService.formatOlympicDataForNgxCharts(data);
        this.numberOfCountries = data.length;
        this.numberOfJOs = this.olympicService.getNumberOfJOs(data);
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = error.message;
        this.loading = false;
      },
    });
  }

  onCountrySelected(countryName: string): void {
    this.router.navigate(['/country-details', countryName]);
  }
}
