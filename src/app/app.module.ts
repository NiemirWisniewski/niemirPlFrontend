import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './pages/header/header.component';
import {ToastrModule} from 'ngx-toastr';
import {RegistrationComponent} from './pages/registration/registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CommonModule} from "@angular/common";
import {MikroblogComponent} from "./pages/mikroblog/mikroblog.component";
import {QuillModule} from "ngx-quill";
import {QuillComponent} from "./pages/mikroblog/quill-text-editor/quill.component";
import {NgxFileDropModule} from "ngx-file-drop";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {PostComponent} from "./pages/mikroblog/post/post.component";
import {LogoutComponent} from "./pages/logout/logout.component";
import {HttpRequestInterceptor} from './services/http-request-interceptor';
import {AuthenticationService} from "./services/auth.service";
import {BiographyComponent} from "./pages/biography/biography.component";
import {DownloadService} from "./services/download.service";
import {PasswordResetComponent} from "./pages/login/password-reset/password-reset.component";
import {NewPasswordComponent} from "./pages/login/new-password/new-password.component";
import {TokenExpiredComponent} from "./pages/login/token-expired/token-expired.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {UserService} from "./services/user.service";
import {HomeService} from "./services/home.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
    MikroblogComponent,
    QuillComponent,
    PostComponent,
    LogoutComponent,
    BiographyComponent,
    PasswordResetComponent,
    NewPasswordComponent,
    TokenExpiredComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      maxOpened: 2,
      preventDuplicates: true,
      positionClass: 'toast-top-center',
      timeOut: 5000,
      closeButton: true,
      autoDismiss: true,
      newestOnTop: true
    }),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    QuillModule.forRoot(),
    NgxFileDropModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
  ],
  exports: [],
  providers: [AuthenticationService, [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ], DownloadService, UserService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
