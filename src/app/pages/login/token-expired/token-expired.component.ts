import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-token-expired',
  templateUrl: './token-expired.component.html',
  styleUrls: ['./token-expired.component.scss']
})
export class TokenExpiredComponent {

  constructor(private router: Router) { }

  onPasswordReset(): void {
    this.router.navigate(['password-reset']);
  }

}
