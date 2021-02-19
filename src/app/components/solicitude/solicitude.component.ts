import { Component, OnInit, DoCheck } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-solicitude',
  templateUrl: './solicitude.component.html',
  styleUrls: ['./solicitude.component.css'],
  providers: [PostService]
})
export class SolicitudeComponent implements OnInit {

  public posts: [Post]

  constructor(private _postService: PostService) { }

  ngOnInit(): void {

    this.getPendingPost();

  }

  // todo: implement infinite scroll with pagination
  // ? for a better navigation with the user.

  getPendingPost() {
    this._postService.getPendingPosts().subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') {
          this.posts = response.posts.data;
          // console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
