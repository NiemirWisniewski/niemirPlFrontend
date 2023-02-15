import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{

  constructor(private router : Router, private authenticationService : AuthenticationService) {
  }
  ngOnInit(): void {
    this.authenticationService.logOut().subscribe();
    this.router.navigate(['login']);
  }

}
