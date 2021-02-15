import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.css'],
  providers: [PostService]
})
export class RecentsComponent implements OnInit {

  public posts: [Post];

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this.getRamdonPosts();
  }

  getRamdonPosts(){
    this._postService.getTwoRandomPost().subscribe(
      response =>{
        if(response.status == 'success'){
          this.posts = response.posts;
        }
        console.log(this.posts);
      },

      error =>{
        console.log(error);
      }
    )
  }

}
