import {Component} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent{

  constructor(private spinner : NgxSpinnerService) {
  }

  show() : void{
    this.spinner.show("sharedSpiner",{
      type: "ball-clip-rotate",
      size: "medium",
      color: '#3F51B5',
      fullScreen: true
    });
  }

  hide() : void {
    this.spinner.hide('sharedSpinner');
  }



}
