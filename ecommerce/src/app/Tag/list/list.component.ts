import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/Service/tag.service';

@Component({
  selector: 'app-list-tag',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tags = [];

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.tagService.getTags()
      .subscribe(data => {
        this.tags = data;
      })
  }

}
