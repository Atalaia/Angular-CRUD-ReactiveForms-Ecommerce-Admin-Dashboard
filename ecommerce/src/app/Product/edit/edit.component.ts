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
  category: number = null;
  tag: Array<any> = [];
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params['id']);
    this.editForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      photo: [null, Validators.required],
      category: [this.getCategories(), Validators.required],
      tag: [this.getTags(), Validators.required],
    });
  }

  getProduct(id) {
    this.productService.getProduct(id).subscribe(data => {
      this._id = data._id;
      this.editForm.setValue({
        name: data.name,
        price: data.price,
        photo: data.photo,
        category: data.category,
        tag: data.tag
      });
    });
  }

  getTags() {
    this.tagService.getTags()
      .subscribe(data => {
        this.tag = data;
        this.addCheckBoxes();
      });
  }

  addCheckBoxes() {
    this.tag.forEach((t, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.editForm['controls'].tag as FormArray).push(control);
    });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.category = data;
      });
  }


  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;

    const selectedTagIds = this.editForm.value.tag
      .map((v, i) => (v ? this.tag[i].id : null))
      .filter(v => v !== null);
    console.log(selectedTagIds);

    this.editForm.value.tag = selectedTagIds;

    console.log(this.editForm.value);
    console.log(form);

    this.productService.editProduct(this._id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/product']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

}
