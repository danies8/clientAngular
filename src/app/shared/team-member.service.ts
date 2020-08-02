import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';

export interface TeamMember {
  _id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private baseUri= "http://localhost:8081/api/team/";

  constructor(private http: HttpClient) {}

  getAllTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.baseUri)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
    );
  }
  
  createTeamMember(newTeamMember:TeamMember):Observable<TeamMember>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TeamMember>(this.baseUri, newTeamMember, { headers: headers })
    .pipe(
      tap(data => console.log('createTeamMember: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
   }

  private handleError(err) {
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
    console.error(err);
    return throwError(errorMessage );
  }

}
