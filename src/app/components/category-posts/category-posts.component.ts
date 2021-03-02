import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category-posts',
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.css'],
  providers: [PostService]
})
export class CategoryPostsComponent implements OnInit, DoCheck {

  public posts: any[] = [];
  public throttle: number = 50;
  public scrollDistance: number = 1;
  public scrollUpDistance: number = 2;
  public direction: string = "";
  public page: number = 1;

  constructor(private _postService: PostService, private _route: ActivatedRoute, private _router: Router) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getPostsByCategory();

  }

  ngDoCheck(): void {
    this.posts;
  }


  getPostsByCategory() {

    this._route.params.subscribe(params => {
      let id = params["id"];
      this._postService.getPostsByCategory(id, this.page).subscribe(
        response => {
          console.log(response);
          if (response.status == "success") {
            this.posts.push(...response.posts.data);
          }

        },
        error => {
          console.log(error);
        }

      )


    })
  }

  onScrollDown() {

    this.page++;

    this.getPostsByCategory();

  }



}
