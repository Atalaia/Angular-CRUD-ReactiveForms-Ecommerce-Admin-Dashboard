import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from 'src/app/Service/tag.service';

@Component({
  selector: 'app-edit-tag',
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
    private tagService: TagService,
  ) 
  {
    this.getTag(this.route.snapshot.params['id']);
    this.editForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
    console.log(this.editForm);
  }

  ngOnInit(): void { }

  getTag(id) {
    this.tagService.getTag(id).subscribe(data => {
      this._id = data.id;   
      this.editForm.setValue({
        name: data.name
      });
    });
  }

  onFormSubmit(form: NgForm) {

    console.log(form);
    console.log(this._id);
    
    this.tagService.editTag(this._id, form)
      .subscribe(res => {
        console.log("Tag updated");
        // let id = res['_id'];
        this.router.navigate(['/tag']);
      }, (err) => {
        console.log(err);
      }
      );
  }

}
