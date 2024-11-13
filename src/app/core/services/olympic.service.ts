import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic.interface';
import { Participation } from '../models/Participation.interface';
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
      value: this.getTotalMedalsPerCountry(olympic.participations),
    }));
  }

  formatDetailsDataForNgxLineChart(olympic: Olympic): NgxLineData[] {
    const seriesData = olympic.participations.map((participation) => ({
      name: new Date(participation.year, 0),
      value: participation.medalsCount,
    }));

    return [
      {
        name: olympic.country,
        series: seriesData,
      },
    ];
  }

  getTotalMedalsPerCountry(data: Participation[]): number {
    return data
      .map((participation) => participation.medalsCount)
      .reduce((a, b) => a + b);
  }

  getOlympicById(olympicId: number): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((olympics) => olympics.find((olympic) => olympic.id === olympicId))
    );
  }
}
