import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic.interface';
import { Participation } from '../models/Participation.interface';
import { NgxDataArray } from '../type/ngxDataArray.type';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((data) => this.olympics$.next(data)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    // le asObservable empeche n'effectuer une modification après (pas de .next possible)
    return this.olympics$.asObservable();
  }

  formatOlympicDataForNgxCharts(data: Olympic[]): NgxDataArray[] {
    return data.map((olympic) => ({
      name: olympic.country,
      value: this.getTotalMedalsPerCountry(olympic.participations),
    }));
  }

  getTotalMedalsPerCountry(data: Participation[]): number {
    return data
      .map((participation) => participation.medalsCount)
      .reduce((a, b) => a + b);
  }
}
