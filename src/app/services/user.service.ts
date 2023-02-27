import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../domain/user';
import {Observable, throwError} from 'rxjs';
import {HttpClientHelper} from "../shared/http.client.default";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${HttpClientHelper.baseURL}/users/current`);
  }

  createUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${HttpClientHelper.baseURL}/users/`, user).pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`${HttpClientHelper.baseURL}/users/current`, user);
  }

  logOut(): Observable<any> {
    sessionStorage.removeItem('username');
    return this.httpClient.post<any>(`${HttpClientHelper.authURL}/logout`, null).pipe(tap(console.log));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errorMessage = error.error;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }
}
