import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent as ProductList } from './Product/list/list.component';
import { AddComponent as ProductAdd } from './Product/add/add.component';
import { EditComponent as ProductEdit } from './Product/edit/edit.component';
import { ListComponent as CategoryList } from './Category/list/list.component';
import { AddComponent as CategoryAdd } from './Category/add/add.component';
import { EditComponent as CategoryEdit } from './Category/edit/edit.component';
import { ListComponent as TagList } from './Tag/list/list.component';
import { AddComponent as TagAdd } from './Tag/add/add.component';
import { EditComponent as TagEdit } from './Tag/edit/edit.component';
import { DeleteComponent } from './Product/delete/delete.component';
import { SalesChartsComponent } from './sales-charts/sales-charts.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ProductList,
    ProductAdd,
    ProductEdit,
    CategoryList,
    CategoryAdd,
    CategoryEdit,
    TagList,
    TagAdd,
    TagEdit,
    DeleteComponent,
    SalesChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    [CommonModule],
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
