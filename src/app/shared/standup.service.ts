import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError, Subject, merge } from 'rxjs';
import { catchError, tap, map, scan } from 'rxjs/operators';

export interface Standup {
  _teamMemberId:String,
  teamMember: String,
  project: String,
  workYesterday:String,
  workToday: String,
  impediment: String ,
  createdOn: Date
}

@Injectable({
  providedIn: 'root'
})
export class StandupService {

  private baseUri= "http://localhost:8081/api/standup/";

  private standupInsertSubject = new Subject<Standup>();
  standupInsetAction$ = this.standupInsertSubject.asObservable();

  standup$ = this.http.get<Standup[]>(this.baseUri)
  .pipe(
    tap(data => console.log('Products: ', JSON.stringify(data))),
    catchError(this.handleError)
  );

  standupWithAdd$ = merge(
    this.standup$,
    this.standupInsetAction$
  )
    .pipe(
      scan((acc: Standup[], value: Standup) => [...acc, value])
    );


  constructor(private http: HttpClient) {}

/*   getAllStandups(): Observable<Standup[]> {
    return this.http.get<Standup[]>(this.baseUri)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  } */

  getAllStandupByTeamMemberId(teamMemberId:string): Observable<Standup[]> {
    return this.http.get<Standup[]>(this.baseUri + teamMemberId)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createStandup(newStandup:Standup):Observable<Standup>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let results =  this.http.post<Standup>(this.baseUri, newStandup, { headers: headers })
    .pipe(
      tap(data => console.log('createStandup: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
    this.standupInsertSubject.next(newStandup);
     return results;
  }
  
   handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
     }
    //console.error(err);
    return throwError(errorMessage );
  }
 
}
