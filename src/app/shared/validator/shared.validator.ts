import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

// Input fields has possibility to set errorStateMatcher for a simple validation.
// Many validations are going through this function but not all of them.
// More complex ones are created individually.
export class SharedValidator implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}
