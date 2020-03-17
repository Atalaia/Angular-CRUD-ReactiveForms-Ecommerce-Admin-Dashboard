import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent as Category } from './Category/list/list.component';
import { ListComponent as Product } from './Product/list/list.component';
import { ListComponent as Tag } from './Tag/list/list.component';
import { AddComponent as AddCategory } from './Category/add/add.component';
import { AddComponent as AddProduct } from './Product/add/add.component';
import { AddComponent as AddTag } from './Tag/add/add.component';
import { EditComponent as EditCategory } from './Category/edit/edit.component';
import { EditComponent as EditProduct } from './Product/edit/edit.component';
import { EditComponent as EditTag } from './Tag/edit/edit.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path:'category', component: Category },
  { path:'product', component: Product },
  { path:'tag', component: Tag },
  { path:'category/add', component: AddCategory },
  { path:'product/add', component: AddProduct },
  { path:'tag/add', component: AddTag },
  { path:'category/edit', component: EditCategory },
  { path:'product/edit', component: EditProduct },
  { path:'tag/edit', component: EditTag }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
