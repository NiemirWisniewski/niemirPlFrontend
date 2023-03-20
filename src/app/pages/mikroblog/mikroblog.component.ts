import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {ToastrService} from "ngx-toastr";
import {Post} from "../../domain/post";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxFileDropEntry} from "ngx-file-drop";
import {BehaviorSubject, finalize} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {Page} from "../../domain/page";

@Component({
  selector: 'app-mikroblog',
  templateUrl: './mikroblog.component.html',
  styleUrls: ['./mikroblog.component.scss']
})
export class MikroblogComponent implements OnInit{

  constructor(private homeService: HomeService, private logger : NGXLogger, private toastr: ToastrService) {
  }

  imageUrl: any;
  page : Page;
  posts : Post[] = [];
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  postsLoaded() : boolean {
    return !!this.page.totalPages;
  }

  ngOnInit(): void {
    this.homeService.getPosts(0).subscribe({
      next: page => {
        this.page = page;
        this.currentPageSubject.next(page.number);
        this.posts = page.content;
      },
      error: error => {
        this.toastr.error('Nie udało się wyświetlić postów', undefined);
        console.log('[Response error] >>> ' + error.error?.message);
      }
    });
  }

  goToPage(pageNumber?: number): void {
    this.homeService.getPosts(pageNumber).subscribe({
      next: posts => {
        this.currentPageSubject.next(pageNumber);
        this.page = posts;
        this.posts = posts.content;
      },
      error: error => {
        this.toastr.error('Nie udało się wyświetlić postów', undefined);
        console.log('[Response error] >>> ' + error.error?.message);
      }
    });
  }

  goToNextOrPreviousPage(direction? : string) : void{
    this.goToPage(direction === 'Następna' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  contentControl = new FormControl("", [Validators.required, Validators.maxLength((250))]);
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
  }
  formSubmitted = false;


  createPost() {
    this.formSubmitted = true;

    if (this.postForm.invalid) {
      return;
    } else {
      const post = new Post();
      post.content = this.contentControl.value;
      post.author = sessionStorage.getItem('username');
      if(this.imageControl.value !== null){
        post.imageUrl = new Date().getTime().toString();
      }

      console.log(post);
      this.homeService.postPost(post, this.imageControl.value).pipe(finalize(() => {
      })).subscribe(
        data => {
          this.toastr.success('Pomyślnie dodano post', undefined);
          this.formSubmitted = false;
          this.ngOnInit();
          this.contentControl.setValue("");
          this.imageUrl = null;
          this.files = [];
        },
        error => {
          this.formSubmitted = false;
          this.toastr.error('Nie udało się dodać posta', undefined, {
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


  isLogged() : boolean{
    return !!sessionStorage.getItem('username');
  }
}
