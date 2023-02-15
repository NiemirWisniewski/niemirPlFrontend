import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {User} from '../domain/user';
import {Observable} from 'rxjs';
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
    return this.httpClient.post<any>(`${HttpClientHelper.baseURL}/users/`, user);
  }

  updateUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`${HttpClientHelper.baseURL}/users/current`, user);
  }

  logOut(): Observable<any> {
    sessionStorage.removeItem('username');
    return this.httpClient.post<any>(`${HttpClientHelper.authURL}/logout`, null).pipe(tap(console.log));
  }
}
