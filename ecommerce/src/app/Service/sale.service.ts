import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorhandlerService } from './errorhandler.service';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://localhost:8000/sale";


@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http:HttpClient, private errorHandlerService: ErrorhandlerService) { }

  getSales(): Observable<any> {
    return this.http.get<any>(apiUrl)
    .pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.errorHandlerService.handleError('getSales', []))
    );
  }

  getSale(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched sales id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>(`getSale id=${id}`))
    );
  }

  addSale(sales: any): Observable<any> {
    const url = `${apiUrl}/new`;
    return this.http.post<any>(url, sales, httpOptions).pipe(
      tap((sales: any) => console.log(`added sales with id=${sales._id}`)),
      catchError(this.errorHandlerService.handleError<any>('addSale'))
    );
  }

  editSale(id: number, sales: any): Observable<any> {
    const url = `${apiUrl}/edit/${id}`;
    return this.http.put<any>(url, sales, httpOptions).pipe(
      tap(_ => console.log(`updated sales id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>('updateSale'))
    );
  }

  deleteSale(id: number): Observable<any> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted sales id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>('deleteSale'))
    );
  }
}
