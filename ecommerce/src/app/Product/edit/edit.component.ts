import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Service/product.service';
import { CategoryService } from 'src/app/Service/category.service';
import { TagService } from 'src/app/Service/tag.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  _id: number = null;
  name: string = '';
  price: number = null;
  photo: string = '';
  category: any;
  tag: any;
  categoryPrevious: any;
  tagPrevious: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) 
  {
    this.getProduct(this.route.snapshot.params['id']);
    this.editForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      photo: [null, Validators.required],
      category: [this.getCategories(), Validators.required],
      tag: [this.getTags(), Validators.required],
    });
    console.log(this.editForm);
  }

  ngOnInit(): void { }

  getProduct(id) {
    this.productService.getProduct(id).subscribe(data => {
      this._id = data.id;   
      this.editForm.setValue({
        name: data.name,
        price: data.price,
        photo: data.photo,
        category: data.category,
        tag: data.tag
      });
      this.categoryPrevious = data.category;
      this.tagPrevious = data.tag;
      console.log(this.tagPrevious);
    });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.category = data;
      });
  }

  getTags() {
    this.tagService.getTags()
      .subscribe(data => {
        this.tag = data;
        console.log(this.tag)
      });
  }

  onFormSubmit(form: NgForm) {

    console.log(this.editForm.value.category.id);
    console.log(form);
    console.log(this._id);

    const updatedCategory = this.editForm.value.category.id;
    this.editForm.value.category = updatedCategory;

    console.log(form);
    
    this.productService.editProduct(this._id, form)
      .subscribe(res => {
        let id = res['_id'];
   
        this.router.navigate(['/product']);
      }, (err) => {
        console.log(err);
      }
      );
  }

}
