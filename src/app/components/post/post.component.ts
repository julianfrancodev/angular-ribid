import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {

  public post: Post;

  constructor(private _postService: PostService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.post;
          }

          console.log(this.post);
        },
        error => {
          console.log(error);
          this._router.navigate(['']);
        }
      );

    });
  }

}
