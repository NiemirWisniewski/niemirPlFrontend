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
import {NgxSpinnerModule} from 'ngx-spinner';
import {SpinnerComponent} from './shared/spinner/spinner.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CommonModule} from "@angular/common";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {QuillModule} from "ngx-quill";
import {ContentComponent} from "./pages/homepage/content/content.component";
import {NgxFileDropModule} from "ngx-file-drop";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {PostComponent} from "./pages/post/post.component";
import {LogoutComponent} from "./pages/logout/logout.component";
import {HttpRequestInterceptor} from './services/http-request-interceptor';
import {AuthenticationService} from "./services/auth.service";
import {BiographyComponent} from "./pages/biography/biography.component";
import {DownloadService} from "./services/download.service";
import {PasswordResetComponent} from "./pages/login/password-reset/password-reset.component";
import {NewPasswordComponent} from "./pages/login/new-password/new-password.component";
import {TokenExpiredComponent} from "./pages/login/token-expired/token-expired.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
    SpinnerComponent,
    HomepageComponent,
    ContentComponent,
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
      timeOut: 2000,
      closeButton: true,
      autoDismiss: true,
      newestOnTop: true
    }),
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    QuillModule.forRoot(),
    NgxFileDropModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [SpinnerComponent],
  providers: [AuthenticationService, [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ], DownloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
