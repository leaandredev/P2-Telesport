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

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent implements OnInit {
  public olympic!: Olympic;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const olympicId = this.route.snapshot.params['id'];

    if (olympicId) {
      this.olympicService
        .getOlympicById(Number(olympicId))
        .subscribe((olympic) => {
          if (!olympic) {
            throw new Error('Olympic non trouvé');
          }
          this.olympic = olympic;
        });
    }
  }
}
