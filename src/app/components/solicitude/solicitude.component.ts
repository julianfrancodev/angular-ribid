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
  public postsComplete: any[] = [];
  public throttle: number = 50;
  public scrollDistance: number = 1;
  public scrollUpDistance: number = 2;
  public direction: string = "";
  public page: number = 1;
  public pageComplete: number = 1;

  constructor(private _postService: PostService) { }


  ngOnInit(): void {

    this.getPendingPost();
    this.getCompletePost();
  }

  ngDoCheck(): void {
    this.posts;
    this.postsComplete;
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

  getCompletePost(){
    this._postService.getCompletePosts(this.pageComplete).subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') {
          this.postsComplete.push(...response.posts.data);
          console.log(this.postsComplete);
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

  onScrollDownComplete(){
    this.pageComplete++;
    this.getCompletePost();
  }

}
