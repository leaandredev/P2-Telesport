import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic.interface';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgxLineData } from 'src/app/core/type/ngxLineData.type';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  public olympic!: Olympic;
  public dataLineChart: NgxLineData[] = [];
  public numberOfEntries: number = 0;
  public totalNumberOfMedals: number = 0;
  public totalNumberOfAthletes: number = 0;
  public errorMessage: string | null = null;
  public loading: boolean = false;
  private subscription!: Subscription;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const countryName = this.route.snapshot.params['id'];

    if (countryName) {
      this.subscription = this.olympicService
        .getOlympicByName(countryName)
        .subscribe((olympic) => {
          if (!olympic) {
            this.errorMessage = `Country ${countryName} not found.`;
            return;
          }
          this.olympic = olympic;

          this.dataLineChart =
            this.olympicService.formatDetailsDataForNgxLineChart(this.olympic);

          this.numberOfEntries = this.olympic.participations.length;
          this.totalNumberOfMedals =
            this.olympicService.getTotalMedalsPerCountry(this.olympic);

          this.totalNumberOfAthletes =
            this.olympicService.getTotalAthletesPerCountry(this.olympic);
          this.loading = false;
        });
    } else {
      this.errorMessage = 'CountryName URL parameter is missing.';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
