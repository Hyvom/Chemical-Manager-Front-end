import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { RequestEditComponent } from './requests/request-edit/request-edit.component';
import { RequestListComponent } from './requests/request-list/request-list.component';
import { RequestDetailComponent } from './requests/request-detail/request-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/detail/:id', component: ProductEditComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/add', component: ProductEditComponent },
  { path: 'products/add', component: ProductEditComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'requests', component: RequestListComponent }, // You'll create this next
  { path: 'requests/add', component: RequestEditComponent },
  { path: 'requests/edit/:id', component: RequestEditComponent },
  // Add other routes/modules here later
];

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
};
