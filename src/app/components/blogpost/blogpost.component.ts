import { Component, OnInit, DoCheck } from '@angular/core';
import { PostService } from '../../services/post.service';



@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css'],
  providers: [PostService]
})
export class BlogpostComponent implements OnInit, DoCheck {

  public posts: any[] = [];
  public throttle: number = 50;
  public scrollDistance: number = 1;
  public scrollUpDistance: number = 2;
  public direction: string = "";
  public page: number = 1;
  constructor(private _postService: PostService) { }


  ngOnInit(): void {
    this.getPosts();
  }

  ngDoCheck(): void {
    this.posts;
  }


  getPosts() {
    this._postService.getPosts(this.page).subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') {

          this.posts.push(...response.posts.data);

        }
        console.log(this.posts);
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

    this.getPosts();

  }






}
