import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { RequestEditComponent } from './requests/request-edit/request-edit.component';
import { RequestListComponent } from './requests/request-list/request-list.component';
import { RequestDetailComponent } from './requests/request-detail/request-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Public routes (no guard)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected routes (🔒 add canActivate)
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'nav-bar', component: NavbarComponent, canActivate: [authGuard] },

  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/detail/:id', component: ProductEditComponent, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: ProductEditComponent, canActivate: [authGuard] },
  { path: 'products/add', component: ProductEditComponent, canActivate: [authGuard] },

  { path: 'requests', component: RequestListComponent, canActivate: [authGuard] },
  { path: 'requests/add', component: RequestEditComponent, canActivate: [authGuard] },
  { path: 'requests/edit/:id', component: RequestEditComponent, canActivate: [authGuard] },

  { path: 'users', component: UserListComponent, canActivate: [authGuard, adminGuard] }];

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
};
