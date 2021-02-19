import { Component, OnInit, DoCheck } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-solicitude',
  templateUrl: './solicitude.component.html',
  styleUrls: ['./solicitude.component.css'],
  providers: [PostService]
})
export class SolicitudeComponent implements OnInit, DoCheck {

  public posts: any[] = [];
  public throttle: number = 50;
  public scrollDistance: number = 1;
  public scrollUpDistance: number = 2;
  public direction: string = "";
  public page: number = 1;

  constructor(private _postService: PostService) { }


  ngOnInit(): void {

    this.getPendingPost();

  }

  ngDoCheck(): void {
    this.posts;
  }

  // todo: implement infinite scroll with pagination
  // ? for a better navigation with the user.

  getPendingPost() {
    this._postService.getPendingPosts(this.page).subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') {
          this.posts.push(...response.posts.data);
          console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onScrollDown() {
    console.log("scrolled down!!");

    // add another 20 items to array

    this.page++;

    this.getPendingPost();

  }

}
