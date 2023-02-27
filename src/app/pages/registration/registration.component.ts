import {Component, ViewChild} from '@angular/core';
import {User} from "../../domain/user";
import {finalize} from "rxjs";
import {SpinnerComponent} from "../../shared/spinner/spinner.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TwoPasswordsValidator} from "../../shared/validator/two.passwords.validator";
import {SharedValidator} from "../../shared/validator/shared.validator";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  @ViewChild(SpinnerComponent) spinner;


  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
    Validators.minLength(3), Validators.maxLength(40)]);
  username = new FormControl('', [
    Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
  password = new FormControl('', [
    Validators.required, Validators.minLength(5), Validators.maxLength(20)]
  );
  passwordRepeat = new FormControl('',
    []);

  registrationForm = new FormGroup({
    email: this.email,
    username: this.username,
    password: this.password,
    passwordRepeat: this.passwordRepeat
  });

  submitted = false;
  sharedValidator = new SharedValidator();
  twoPasswordsValidator = new TwoPasswordsValidator();

  constructor(private formBuilder: FormBuilder,
              private userService: UserService, private toastr: ToastrService, private router: Router) {
  }

  createUser() {

    const user = new User();
    user.email = this.getEmail().value;
    user.username = this.getUsername().value;
    user.newPassword = this.getPassword().value;
    user.newRepeatedPassword = this.getPasswordRepeat().value;

    this.submitted = true;
    if (this.registrationForm.invalid || this.passwordRepeat.invalid || user.newPassword !== user.newRepeatedPassword) {
      return;
    } else {
      /*this.spinner.show();*/
      console.log(JSON.stringify(this.registrationForm.value));
      this.userService.createUser(user).pipe(finalize(() => {
        /*this.spinner.hide();*/
      })).subscribe(data => {
          this.toastr.success("Potwierdź rejestrację na mailu", undefined,
            {positionClass: "toast-top-center"});
          this.router.navigate(['login']);
        },
        error => {
          this.toastr.error(error, undefined, {
            positionClass: 'toast-top-center'
          });
        }
      );
    }
  }



  onBack(): void {
    this.router.navigate(['login']);
  }

  getEmail() {
    return this.email;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getPasswordRepeat() {
    return this.passwordRepeat;
  }

  isPasswordError() {
    return !!this.getPassword().errors;
  }
}














