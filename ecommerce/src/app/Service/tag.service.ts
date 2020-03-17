import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorhandlerService } from 'src/app/Service/errorhandler.service';

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

}
