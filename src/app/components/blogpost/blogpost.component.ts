import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';



@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [PostService]
})
export class BlogpostComponent implements OnInit {

  public posts: [Post];

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  // todo: implement infinite scroll with pagination
  // ? for a better navigation with the user.

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
          // console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    )
  }


}
