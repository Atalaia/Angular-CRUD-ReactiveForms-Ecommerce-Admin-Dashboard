import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  product:any = {
    _id: null,
    name: '',
    price: null,
    photo: '',
    category: null,
    tag: []
  }


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.getProduct(this.route.snapshot.params['id']);
  }

  getProduct(id) {
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
      console.log(this.product);
    });
  }

  deleteProduct(id) {
    
    this.productService.deleteProduct(id).subscribe(data => {
      console.log('Product deleted');
      this.router.navigate(['/product']);
    }, (err) => {
      console.log(err);
    }
    );
  }
}
