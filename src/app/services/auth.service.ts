import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClientHelper} from "../shared/http.client.default";
import {tap} from "rxjs/operators";

export class User {
  constructor(public status: string) {
  }
}

@Injectable({
  providedIn : 'root'
})
export class AuthenticationService {

  constructor(private httpClient : HttpClient) {
  }

  authenticate(username : string, password : string) : Observable<void>{
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.httpClient
      .post<any>(`${HttpClientHelper.authURL}/login`, formData)
      .pipe(
        map(userData => {
          sessionStorage.setItem('username', username);
          return userData;
        })
      );
  }

  getUsername() {
    const username = sessionStorage.getItem('username');
    if (username !== null) {
      return sessionStorage.getItem('username');
    }
    return '';
  }


  isUserLoggedIn() {
    const username = sessionStorage.getItem('username');
    return !(username === null);
  }

  clear() {
    sessionStorage.removeItem('username');
  }

  logOut() : Observable<void> {
    sessionStorage.removeItem('username');
    return this.httpClient.post<any>(`${HttpClientHelper.authURL}/logout`, null).pipe(tap(console.log));
  }

  resetPassword(username: string) : Observable<void> {
    const body = {
      'email': username
    };

    return this.httpClient.post<any>(`${HttpClientHelper.authURL}/auth/password/token`, body).pipe(tap(console.log));
  }

  newPassword(newPassword: string, newRepeatedPassword: string, token: string) : Observable<void> {
    const body = {
      'newPassword': newPassword,
      'newRepeatedPassword': newRepeatedPassword,
      'token': token
    };

    return this.httpClient.post<any>(`${HttpClientHelper.authURL}/auth/password/new`, body).pipe(tap(console.log));
  }
}
