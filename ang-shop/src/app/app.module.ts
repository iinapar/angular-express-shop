import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { EditProductsComponent } from './admin/edit-products/edit-products.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductDetailsComponent } from './admin/product-details/product-details.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ProductComponent,
    CategoryComponent,
    LoginComponent,
    EditProductsComponent,
    AddProductComponent,
    ProductDetailsComponent,
    CreateProfileComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
