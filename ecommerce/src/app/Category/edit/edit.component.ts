import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  _id: number = null;
  name: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) 
  {
    this.getCategory(this.route.snapshot.params['id']);
    this.editForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
    console.log(this.editForm);
  }

  ngOnInit(): void { }

  getCategory(id) {
    this.categoryService.getCategory(id).subscribe(data => {
      this._id = data.id;   
      this.editForm.setValue({
        name: data.name
      });
    });
  }

  onFormSubmit(form: NgForm) {

    console.log(form);
    console.log(this._id);
    
    this.categoryService.editCategory(this._id, form)
      .subscribe(res => {
        console.log("Category updated");
        // let id = res['_id'];
        this.router.navigate(['/category']);
      }, (err) => {
        console.log(err);
      }
      );
  }

}
