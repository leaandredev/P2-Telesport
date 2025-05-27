import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { Olympic } from '../models/Olympic.interface';
import { NgxPieData } from '../types/ngxPieData.type';
import { NgxLineData } from '../types/ngxLineData.type';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    if (!navigator.onLine) {
      return throwError(() => 'You are offline.');
    }

    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      timeout(5000),
      tap((data) => {
        console.log(data);
        if (!data || data.length === 0) {
          throw new Error('File is empty.');
        } else {
          this.olympics$.next(data);
        }
      }),
      catchError((error, caught) => {
        this.olympics$.next([]);
        return throwError(() => error);
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  formatOlympicDataForNgxPieCharts(data: Olympic[]): NgxPieData[] {
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
