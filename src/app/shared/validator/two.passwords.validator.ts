import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class TwoPasswordsValidator implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const password = form?.form.controls.password;

    const invalid = (!password?.hasError('minlength')
        && !password?.hasError('maxlength')
        && !password?.hasError('required')) && password?.value !== control?.value
      && isSubmitted;

    if (invalid) {
      control?.setErrors({'passwordDontMatch': true});
    } else {
      control?.setErrors(null);
    }

    return !!(invalid);
  }
}
