import {Component} from '@angular/core';
import {DownloadService} from "../../services/download.service";
import {saveAs} from 'file-saver';
import {HttpEventType} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent {

  constructor(private downloadService : DownloadService, private toastr: ToastrService) {
  }
  downloadBio() : void {
    this.downloadService.downloadCV().subscribe({
      next: event => {
      console.log(event);
      if (event.type == HttpEventType.Response) {
        saveAs(new File([event.body], event.headers.get('file-name'),
          {type: `${event.headers.get('Content-Type')};charset=utf-8`}));
      }
    }
  , error: error => {
      this.toastr.error("Wystąpił problem z pobraniem pliku",
        undefined, {timeOut: 5000, positionClass: 'toast-top-center'});
      console.log(error);
    }
  });
  }
}
