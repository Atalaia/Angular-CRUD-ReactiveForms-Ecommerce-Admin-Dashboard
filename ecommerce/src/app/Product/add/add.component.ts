import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import {Router} from "@angular/router";
import { ProductService } from 'src/app/Service/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  addForm: FormGroup;

  // tags = this.productService.get();

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      name: new FormControl(''),
      price: new FormControl(''),
      photo: new FormControl(''),
      category: new FormControl(''),
      // tags: new FormArray([
      //   new FormControl(true),
      //   new FormControl(false),
      // ])
    })
  }

  onSubmit() {
    this.productService.addProduct(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['product']);
      });
  }

}
