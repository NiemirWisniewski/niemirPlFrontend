import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {ToastrService} from "ngx-toastr";
import {Post} from "../../domain/post";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxFileDropEntry} from "ngx-file-drop";
import {SpinnerComponent} from "../../shared/spinner/spinner.component";
import {finalize} from "rxjs";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  @ViewChild(SpinnerComponent) spinner;
  imageUrl: any;

  constructor(private homeService: HomeService, private logger : NGXLogger, private toastr: ToastrService) {
  }

  posts : Post[] = [];

  ngOnInit(): void {
    this.homeService.getPosts().subscribe(
      posts => {
        this.posts = posts;
      },
      error => {
        this.toastr.error('Getting posts failed', undefined, {
          positionClass: 'toast-top-center'
        });
        console.log('[Response error] >>> ' + error.error?.message);
      }
    );
  }

  contentControl = new FormControl("", [Validators.required, Validators.maxLength((200))]);
  imageControl = new FormControl( null,[]);

  postForm = new FormGroup({
    contentControl : this.contentControl,
    imageControl: this.imageControl
  });

  contentEntered : string;
  imageSelected = false;
  files: NgxFileDropEntry[] = [];

  onContentChangeEvent(content) {
    this.contentEntered = content;
    console.log(this.contentEntered);
  }
  formSubmitted = false;


  createPost() {
    this.formSubmitted = true;

    if (this.postForm.invalid) {
      return;
    } else {
      this.spinner.show();
      const post = new Post();
      post.content = this.contentControl.value;
      post.author = sessionStorage.getItem('username');
      // It's good to set timestamp as a name of the file.
      // In case of lack of permission to update file (in your OS) you won't have
      // possibility to replace file with the same name and you are in stuck.
      // This method will always create a new file, because even you put
      // into the component image with existing name, its final name will always be different.
      if(this.imageControl.value !== null){
        post.imageUrl = new Date().getTime().toString();
      }

      console.log(post);
      this.homeService.postPost(post, this.imageControl.value).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe(
        data => {
          this.toastr.success('Item has been saved successfully', undefined, {
            positionClass: 'toast-top-center'
          });
          this.formSubmitted = false;

          //this._loadItems();
        },
        error => {
          this.formSubmitted = false;
          this.toastr.error('Saving item failed', undefined, {
            positionClass: 'toast-top-center'
          });
          this.logger.error('[Response error] >>> ', error.error?.message);
        }
      );
    }
  }

  private _isFileAllowed(fileName : string) {
    let isFileAllowed = false;
    const allowedFiles = ['.jpg', '.jpeg', '.png'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  private _isFileSizeAllowed(size) {
    let isFileSizeAllowed = false;
    if (size < 3145728) { // 3MB in bytes
      isFileSizeAllowed = true;
    }
    return isFileSizeAllowed;

  }

  dropped(files: NgxFileDropEntry[]) {
    this.imageSelected = true;
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile && this._isFileAllowed(droppedFile.fileEntry.name)) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this._isFileSizeAllowed(file.size)) {
            this.imageControl.setValue(file);
            console.log(droppedFile.relativePath, file);
            const reader = new FileReader();
            reader.readAsDataURL(file); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
              if (event.target) {
                this.imageUrl = event.target?.result;
              }
            };
          } else {
            this.imageControl.setErrors({'imageInvalid': true});
          }
        });
      } else {
        this.imageControl.setErrors({'imageInvalid': true});
      }
    }
  }

  fileOver(event) {
  }

  fileLeave(event) {
  }
}
