import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic.interface';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgxLineData } from 'src/app/core/type/ngxDataArray.type';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent implements OnInit {
  public olympic!: Olympic;
  public dataLineChart: NgxLineData[] = [];

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.params['id'];

    if (countryName) {
      this.olympicService.getOlympicByName(countryName).subscribe((olympic) => {
        if (!olympic) {
          throw new Error('Olympic non trouvé');
        }
        this.olympic = olympic;
        this.dataLineChart =
          this.olympicService.formatDetailsDataForNgxLineChart(this.olympic);
      });
    }
  }
}
