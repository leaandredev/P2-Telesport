import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic.interface';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgxPieData } from 'src/app/core/types/ngxPieData.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of([]);
  public dataPieChart: NgxPieData[] = [];
  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;
  public errorMessage: string | null = null;
  public loading: boolean = false;
  private subscription!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;

    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe({
      next: (data) => {
        this.dataPieChart =
          this.olympicService.formatOlympicDataForNgxPieCharts(data);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCountrySelected(countryName: string): void {
    this.router.navigate(['/country-details', countryName]);
  }
}
