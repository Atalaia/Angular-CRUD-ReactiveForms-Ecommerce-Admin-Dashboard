import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Service/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  category:any = {
    _id: null,
    name: ''
  }


  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.getCategory(this.route.snapshot.params['id']);
  }

  getCategory(id) {
    this.categoryService.getCategory(id).subscribe(data => {
      this.category = data;
      console.log(this.category);
    });
  }

  deleteCategory(id) {
    
    this.categoryService.deleteCategory(id).subscribe(data => {
      console.log('Category deleted');
      this.router.navigate(['/category']);
    }, (err) => {
      console.log(err);
    }
    );
  }
}
