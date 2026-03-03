
import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent }, 
  { path: 'product-form', component: ProductFormComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];