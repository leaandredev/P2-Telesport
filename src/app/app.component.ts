import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public error: string | null = null;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService
      .loadInitialData()
      .pipe(take(1))
      .subscribe({
        error: (error) => {
          if (error.status === 404) {
            this.error =
              "l'URL de récupération des données n'a pas été trouvée.";
          } else {
            this.error = error.message;
          }
        },
      });
  }
}
