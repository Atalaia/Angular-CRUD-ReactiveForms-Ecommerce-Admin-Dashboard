import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorhandlerService } from 'src/app/Service/errorhandler.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://localhost:8000/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http:HttpClient, private errorHandlerService: ErrorhandlerService) { }

  getTags(): Observable<any> {
    return this.http.get('http://localhost:8000/tag')
    .pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.errorHandlerService.handleError('getTags', []))
    );
  }

  getTag(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched tag id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>(`getTag id=${id}`))
    );
  }

  addTag(tag: any): Observable<any> {
    const url = `${apiUrl}/new`;
    return this.http.post<any>(url, tag, httpOptions).pipe(
      tap((tag: any) => console.log(`added tag with id=${tag._id}`)),
      catchError(this.errorHandlerService.handleError<any>('addTag'))
    );
  }

  editTag(id: number, tag: any): Observable<any> {
    const url = `${apiUrl}/edit/${id}`;
    return this.http.put<any>(url, tag, httpOptions).pipe(
      tap(_ => console.log(`updated tag id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>('updateTag'))
    );
  }

  deleteTag(id: number): Observable<any> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted tag id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>('deleteTag'))
    );
  }
}
