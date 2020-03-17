import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Service/product.service';
import { TagService } from 'src/app/Service/tag.service';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  //On declare la variable qui sert aux checkboxs
  tagsData = [];
  category = [];

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private productService: ProductService,
    private categoryService: CategoryService, 
    private tagService: TagService) 
    {
    this.addForm = this.formBuilder.group({
      id: [],
      name: new FormControl(''),
      price: new FormControl(''),
      photo: new FormControl(''),
      category: new FormControl(''),
      tags: new FormArray([])
    });
  }

  ngOnInit() {
    this.getTags();
    this.getCategories();
  }

  getTags() {
    this.tagService.getTags()
      .subscribe(data => {
        this.tagsData = data;
        this.addCheckBoxes();
      });
  }

  addCheckBoxes() {
    this.tagsData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.addForm['controls'].tags as FormArray).push(control);
    });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.category = data;
      });
  }

  onSubmit() {
    this.productService.addProduct(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['product']);
      });
  }
}