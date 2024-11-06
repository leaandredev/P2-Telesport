import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((jsonData) => {
        const olympics = jsonData.map(
          (olympicData) =>
            new Olympic(
              olympicData.id,
              olympicData.country,
              olympicData.participations.map(
                (participationData) =>
                  new Participation(
                    participationData.id,
                    participationData.year,
                    participationData.city,
                    participationData.medalsCount,
                    participationData.athleteCount
                  )
              )
            )
        );
        this.olympics$.next(olympics);
      }),
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
    return this.olympics$.asObservable();
  }
}
