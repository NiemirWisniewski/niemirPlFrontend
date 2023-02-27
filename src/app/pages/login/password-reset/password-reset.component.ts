import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedValidator} from "../../../shared/validator/shared.validator";
import {finalize} from "rxjs";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  email = new FormControl('', [
    Validators.required,
    Validators.email]);

  emailForm = new FormGroup({
    email: this.email
  });
  sharedValidator = new SharedValidator();

  passwordChangeApprovalButtonDisabled: boolean;

  constructor(private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder,
              private authService: AuthenticationService) {
  }

  resetPassword() {
    if (this.emailForm.invalid) {
      return;
    } else {
      this.passwordChangeApprovalButtonDisabled = true;
      console.log(JSON.stringify(this.emailForm.value));
      this.authService.resetPassword(this.getEmail().value).pipe(finalize(() => {
      })).subscribe(
        data => {
          this.toastr.success('Użyj linku w poczcie do zresetowania hasła ', 'Email został wysłany', {
            positionClass: 'toast-top-center'
          });
          setTimeout(() => {
            this.router.navigate(['login']);
          });
        },
        error => {
          this.toastr.error('Wystąpił nieoczekiwany błąd, spróbój później'
            , undefined, { positionClass: 'toast-top-center'});
        }
      );
    }
  }

  getEmail(): FormControl {
    return this.email;
  }

  isPasswordChangeApprovalButtonDisabled(): boolean {
    return this.passwordChangeApprovalButtonDisabled;
  }

  onBack(): void {
    this.router.navigate(['login']);
  }
}
