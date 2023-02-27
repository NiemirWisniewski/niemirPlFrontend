import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../../services/auth.service";

export class AuthGuard implements CanActivate{

  constructor(private router : Router, private authService : AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(this.authService.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
