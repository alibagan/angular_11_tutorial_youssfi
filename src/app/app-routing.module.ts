import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent} from './components/products/products.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductAddComponent} from './components/product-add/product-add.component';
import {ProductEditComponent} from './components/product-edit/product-edit.component';

const routes : Routes = [
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "new-product",
    component: ProductAddComponent
  },
  {
    path: "edit-product/:id",
    component: ProductEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
