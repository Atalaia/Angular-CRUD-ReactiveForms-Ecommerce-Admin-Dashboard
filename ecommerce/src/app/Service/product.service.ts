import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorhandlerService } from 'src/app/Service/errorhandler.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://localhost:8000/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient, private errorHandlerService: ErrorhandlerService) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(apiUrl)
    .pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.errorHandlerService.handleError('getProducts', []))
    );
  }

  getProduct(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>(`getProduct id=${id}`))
    );
  }

  addProduct(product: any): Observable<any> {
    const url = `${apiUrl}/new`;
    return this.http.post<any>(url, product, httpOptions).pipe(
      tap((product: any) => console.log(`added product with id=${product._id}`)),
      catchError(this.errorHandlerService.handleError<any>('addProduct'))
    );
  }

  editProduct(id: number, product: any): Observable<any> {
    const url = `${apiUrl}/edit/${id}`;
    return this.http.put<any>(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id: number): Observable<any> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>('deleteProduct'))
    );
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
