import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../domain/post";
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private homeService: HomeService) {
  }

  @Input() post: Post = {} as Post;

  ngOnInit(): void {
    if(this.post.imageUrl !== null) {
      this.homeService.getImage(this.post.id).subscribe(
        image => {
          this._setImageInImageComponent(image, this.post);
        },
        error => {
          console.log('[Response error] >>> ' + error.error?.message);
        }
      );
    }
  }

  private _setImageInImageComponent(image: ArrayBuffer, post: Post) {
    const arrayBufferView = new Uint8Array(image);
    const blob = new Blob([arrayBufferView], {
      type: 'image/WebP'
    });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    // Reader's onload is called once readAsDataURL is completed
    reader.onload = (event) => {
      if (event.target) {
        this.post.image = event.target?.result;
      }
    };
  }
}
