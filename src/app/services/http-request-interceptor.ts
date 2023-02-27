import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./auth.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor: ' + request.url);

    //this is required if we set cors() in Spring Security.
    // In such case chrome won't let us in.
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(tap(() => {
    },
      (error : any) => {
      if (error instanceof HttpErrorResponse){
        if( error.status !== 401){
          return;
        }
        this.authService.clear();
        this.router.navigate(['login']);
      }
      }));
  }
}
