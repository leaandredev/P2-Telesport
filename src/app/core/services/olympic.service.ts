import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic.interface';
import { NgxDataArray, NgxLineData } from '../type/ngxDataArray.type';

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

  getOlympics(): Observable<Olympic[]> {
    // le asObservable empeche n'effectuer une modification après (pas de .next possible)
    return this.olympics$.asObservable();
  }

  formatOlympicDataForNgxCharts(data: Olympic[]): NgxDataArray[] {
    return data.map((olympic) => ({
      name: olympic.country,
      value: this.getTotalMedalsPerCountry(olympic),
    }));
  }

  formatDetailsDataForNgxLineChart(olympic: Olympic): NgxLineData[] {
    const seriesData = olympic.participations.map((participation) => ({
      name: new Date(participation.year, 0),
      value: participation.medalsCount,
      city: participation.city,
      athleteCounts: participation.athleteCount,
    }));

    return [
      {
        name: olympic.country,
        series: seriesData,
      },
    ];
  }

  getTotalMedalsPerCountry(olympic: Olympic): number {
    return olympic.participations
      .map((participation) => participation.medalsCount)
      .reduce((a, b) => a + b);
  }

  getTotalAthletesPerCountry(olympic: Olympic): number {
    return olympic.participations
      .map((participation) => participation.athleteCount)
      .reduce((a, b) => a + b);
  }

  getOlympicByName(countryName: string): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics) =>
        olympics.find((olympic) => olympic.country === countryName)
      )
    );
  }

  getNumberOfCountries(): number {
    return this.olympics$.getValue.length;
  }

  getNumberOfJOs(data: Olympic[]): number {
    const yearCityPairs = data.flatMap((olympic) =>
      olympic.participations.map(
        (participation) => `${participation.year}-${participation.city}`
      )
    );

    const uniqueYearCityPairs = new Set(yearCityPairs);
    return uniqueYearCityPairs.size;
  }
}
