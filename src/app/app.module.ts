import {HttpClientModule} from '@angular/common/http';
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
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {AccountComponent} from "./pages/account/account.component";
import {QuillModule} from "ngx-quill";
import {ContentComponent} from "./pages/homepage/content/content.component";
import {NgxFileDropModule} from "ngx-file-drop";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {PostComponent} from "./pages/post/post.component";
import {LogoutComponent} from "./pages/logout/logout.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
    SpinnerComponent,
    HomepageComponent,
    AccountComponent,
    ContentComponent,
    PostComponent,
    LogoutComponent
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
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    QuillModule.forRoot(),
    NgxFileDropModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
  ],
  exports: [SpinnerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
