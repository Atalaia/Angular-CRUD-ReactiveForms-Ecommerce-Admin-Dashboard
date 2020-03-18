import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
     this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
        // console.log(this.products);
      })
  }
}
