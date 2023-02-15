import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientHelper} from "../shared/http.client.default";
import {Post} from "../domain/post";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) {
  }

  postPost(post : Post, imageFile : File) : Observable<any> {
    const json = JSON.stringify(post);
    const formData = new FormData();
    formData.append('postRequest', new Blob([json],
      {type: 'application/json;charset=UTF-8'}));
    if (imageFile == null) {
      return this.httpClient.post(`${HttpClientHelper.baseURL}/posts`, formData,
      ).pipe(tap(console.log));
    } else {
      formData.append('file', imageFile, post.imageUrl);
      return this.httpClient.post(`${HttpClientHelper.baseURL}/posts`, formData,
      ).pipe(tap(console.log));
    }
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${HttpClientHelper.baseURL}/posts/`);
  }

  getImage(id : number): Observable<ArrayBuffer> {
    return this.httpClient.get<ArrayBuffer>(`${HttpClientHelper.baseURL}/images/`+ id, {
      // @ts-ignore
      responseType: 'arrayBuffer'});
  }
}
