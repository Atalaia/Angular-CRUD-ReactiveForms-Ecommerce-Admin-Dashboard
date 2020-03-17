import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorhandlerService } from 'src/app/Service/errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient, private errorHandlerService: ErrorhandlerService) { }

  getProducts(): Observable<any> {
    return this.http.get('http://localhost:8000/product')
    .pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.errorHandlerService.handleError('getProducts', []))
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post('http://localhost:8000/product/new', product);
  }

  // /**
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  */
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);
  //     // Let the app keep running by returning an empty result.
  //     return (error);
  //   };
  // }

}
