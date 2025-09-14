import { Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin';
import { MusicComponent } from './components/music/music.component';
import { AboutComponent } from './components/about/about';
import { ContactComponent } from './components/contact/contact';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'login', redirectTo: '/signin' },
  { path: 'register', redirectTo: '/signin' },
  { path: 'music', component: MusicComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'category', component: CategoryComponent, canActivate: [authGuard] }
];
