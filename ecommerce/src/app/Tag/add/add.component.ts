import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from 'src/app/Service/tag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tagService: TagService) 
    {
    this.addForm = this.formBuilder.group({
      name: new FormControl('')
    });
  }

  ngOnInit():void { }

  onSubmit(form: NgForm) {

    console.log(form);

    this.tagService.addTag(form)
      .subscribe(data => {
        console.log("Tag added");
        this.router.navigate(['/tag']);
      });
  }

}
