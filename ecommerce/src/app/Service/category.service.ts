import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorhandlerService } from 'src/app/Service/errorhandler.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://localhost:8000/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient, private errorHandlerService: ErrorhandlerService) { }

  getCategories(): Observable<any> {
    return this.http.get('http://localhost:8000/category')
    .pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.errorHandlerService.handleError('getCategories', []))
    );
  }

  getCategory(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched category id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>(`getCategory id=${id}`))
    );
  }

  addCategory(category: any): Observable<any> {
    const url = `${apiUrl}/new`;
    return this.http.post<any>(url, category, httpOptions).pipe(
      tap((category: any) => console.log(`added category with id=${category._id}`)),
      catchError(this.errorHandlerService.handleError<any>('addCategory'))
    );
  }

  editCategory(id: number, category: any): Observable<any> {
    const url = `${apiUrl}/edit/${id}`;
    return this.http.put<any>(url, category, httpOptions).pipe(
      tap(_ => console.log(`updated category id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>('updateCategory'))
    );
  }

  deleteCategory(id: number): Observable<any> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted category id=${id}`)),
      catchError(this.errorHandlerService.handleError<any>('deleteCategory'))
    );
  }

}
