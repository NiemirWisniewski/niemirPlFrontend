import {Component, Input} from '@angular/core';
import {AuthenticationService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedValidator} from '../../shared/validator/shared.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  @Input() error: string | null;

  username = new FormControl('', [
    Validators.required]);
  password = new FormControl('', [
    Validators.required]);
  usernameForm = new FormGroup({
    username: this.username,
    password: this.password
  });

  sharedValidator = new SharedValidator();

  constructor(private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder,
              private authService: AuthenticationService) {
  }

  login() {
    if (this.usernameForm.invalid) {
      return;
    } else {
      console.log(JSON.stringify(this.usernameForm.value));
      this.authService.authenticate(this.getUsername().value, this.getPassword().value).subscribe(
        data => {
          this.router.navigate(['mikroblog']);
        },
        error => {
          this.toastr.error('Authentication failed', undefined, {
            positionClass: 'toast-top-center'
          });
        }
      );
    }
  }

  getUsername() : FormControl{
    return this.username;
  }

  getPassword(): FormControl {
    return this.password;
  }

  onPasswordReset(): void {
    this.router.navigate(['password-reset']);
  }

}
