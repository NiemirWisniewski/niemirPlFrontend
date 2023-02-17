import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./pages/registration/registration.component";
import {LoginComponent} from "./pages/login/login.component";
import {AccountComponent} from "./pages/account/account.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {PostComponent} from "./pages/post/post.component";
import {LogoutComponent} from "./pages/logout/logout.component";
import {BiographyComponent} from "./pages/biography/biography.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'post', component: PostComponent},
  {path: 'singlePost', component: PostComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'bio', component: BiographyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
