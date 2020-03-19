import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService) 
    {
    this.addForm = this.formBuilder.group({
      name: new FormControl('')
    });
  }

  ngOnInit():void { }

  onSubmit(form: NgForm) {

    console.log(form);

    this.categoryService.addCategory(form)
      .subscribe(data => {
        console.log("Category added");
        this.router.navigate(['/category']);
      });
  }

}
