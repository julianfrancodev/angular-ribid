import { Component, OnInit, DoCheck } from '@angular/core';
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

    this.page++;

    this.getPendingPost();

  }

}
