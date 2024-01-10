import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { EditProductsComponent } from './admin/edit-products/edit-products.component';
import { AuthGuard } from './auth.guard';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'categories/:category', component: CategoryComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'newprofile', component: CreateProfileComponent },
  { path: 'admin', component: EditProductsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
