import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientHelper} from "../shared/http.client.default";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private httpClient: HttpClient) {
  }

  downloadCV() : Observable<HttpEvent<Blob>>{
    return this.httpClient.get(`${HttpClientHelper.baseURL}/cv`, {
      reportProgress : true,
      observe: 'events',
    responseType: 'blob'})
  }


}
