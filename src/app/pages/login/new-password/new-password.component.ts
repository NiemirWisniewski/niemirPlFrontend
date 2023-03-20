import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TwoPasswordsValidator} from "../../../shared/validator/two.passwords.validator";
import {SharedValidator} from "../../../shared/validator/shared.validator";
import {finalize} from "rxjs";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit{

  password = new FormControl('', [
    Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
  passwordRepeat = new FormControl('', []);

  newPasswordForm = new FormGroup({
    password: this.password,
    passwordRepeat: this.passwordRepeat
  });
  submitted = false;
  sharedValidator = new SharedValidator();
  twoPasswordsValidator = new TwoPasswordsValidator();

  newPasswordApprovalButtonDisabled: boolean;
  toastrNoTitle = undefined;

  token: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private toastr: ToastrService, private formBuilder: FormBuilder,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
  }

  sendPassword() {
    if (this.newPasswordForm.invalid) {
      return;
    } else {
      this.newPasswordApprovalButtonDisabled = true;
      console.log(JSON.stringify(this.newPasswordForm.value));
      this.authService.newPassword(this.getPassword().value,
        this.getPasswordRepeat().value,
        this.token).pipe(finalize(() => {
      })).subscribe({
        next: data => {
          this.toastr.success('Password has been changed', this.toastrNoTitle, {
            positionClass: 'toast-top-center'
          });
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        },
        error: error => {
          this.router.navigate(['tokenExpired']);
        }
      });
    }
  }

  getPassword() {
    return this.password;
  }

  getPasswordRepeat() {
    return this.passwordRepeat;
  }

  isPasswordError() {
    return this.getPassword().errors;
  }

  isNewPasswordApprovalButtonDisabled(): boolean {
    return this.newPasswordApprovalButtonDisabled;
  }

}
