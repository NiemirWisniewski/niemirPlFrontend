import {Component} from '@angular/core';
import {DownloadService} from "../../services/download.service";
import {saveAs} from 'file-saver';
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent {

  constructor(private downloadService : DownloadService) {
  }
  downloadBio() : void {
    this.downloadService.downloadCV().subscribe(
      event => {
        console.log(event);
        if(event.type == HttpEventType.Response)
        {
          saveAs(new File([event.body], event.headers.get('file-name'),
            {type: `${event.headers.get('Content-Type')};charset=utf-8`}));
        }
      },
    error => {
      console.log(error);
    }
    );
  }
}
