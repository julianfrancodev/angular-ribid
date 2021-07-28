import { Component, OnInit, DoCheck } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitude',
  templateUrl: './solicitude.component.html',
  styleUrls: ['./solicitude.component.css'],
  providers: [PostService, UserService]
})
export class SolicitudeComponent implements OnInit, DoCheck {

  public identity: any;
  public posts: any[] = [];
  public postsComplete: any[] = [];
  public throttle: number = 50;
  public scrollDistance: number = 1;
  public scrollUpDistance: number = 2;
  public direction: string = "";
  public page: number = 1;
  public pageComplete: number = 1;


  constructor(
    private router: Router,
    private _postService: PostService,
    private _userService: UserService
  ) {

    if (this._userService.getIdentity() == null) {
      this.router.navigate(['']);
    }

    this.identity = this._userService.getIdentity();

  }


  ngOnInit(): void {

    this.getPendingPost();
    this.getCompletePost();
  }

  ngDoCheck(): void {
    this.posts;
    this.postsComplete;
  }


  getPendingPost() {
    this._postService.getPendingPosts(this.identity.sub, this.page).subscribe(
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

  getCompletePost() {
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

  onScrollDownComplete() {
    this.pageComplete++;
    this.getCompletePost();
  }

}
