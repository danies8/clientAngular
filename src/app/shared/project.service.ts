import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

export interface Project {
  _id: string,
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUri= "http://localhost:8081/api/projects/";


  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUri)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createProject(newProject:Project):Observable<Project>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Project>(this.baseUri, newProject, { headers: headers })
    .pipe(
      tap(data => console.log('createProject: ' + JSON.stringify(data))),
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
