import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from "./pages/registration/registration.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {PostComponent} from "./pages/post/post.component";
import {LogoutComponent} from "./pages/logout/logout.component";
import {BiographyComponent} from "./pages/biography/biography.component";
import {PasswordResetComponent} from "./pages/login/password-reset/password-reset.component";
import {NewPasswordComponent} from "./pages/login/new-password/new-password.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {TokenExpiredComponent} from "./pages/login/token-expired/token-expired.component";

const routes: Routes = [
  {path: '', redirectTo: '/bio', pathMatch: 'full'},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'homepage', redirectTo: '/bio'},
  {path: 'post', component: PostComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'bio', component: BiographyComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'new-password/:token', component:
    NewPasswordComponent},
  {path: 'tokenExpired', component: TokenExpiredComponent},
  {path: 'tokenexpired', component: TokenExpiredComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
