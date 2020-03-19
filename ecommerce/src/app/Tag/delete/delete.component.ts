import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/Service/tag.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  tag:any = {
    _id: null,
    name: ''
  }


  constructor(
    private tagService: TagService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.getTag(this.route.snapshot.params['id']);
  }

  getTag(id) {
    this.tagService.getTag(id).subscribe(data => {
      this.tag = data;
      console.log(this.tag);
    });
  }

  deleteTag(id) {
    
    this.tagService.deleteTag(id).subscribe(data => {
      console.log('Tag deleted');
      this.router.navigate(['/tag']);
    }, (err) => {
      console.log(err);
    }
    );
  }
}
