import { Component, OnInit } from '@angular/core';
import { LibDocumentService } from 'src/app/services/lib-document.service';
import { PostService } from 'src/app/services/post.service';
import { RespostService } from 'src/app/services/respost.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitude-user',
  templateUrl: './solicitude-user.component.html',
  styleUrls: ['./solicitude-user.component.css'],
  providers: [UserService, PostService, RespostService, LibDocumentService]

})
export class SolicitudeUserComponent implements OnInit {


  public identity: any;
  public completePosts: any[] = [];
  public libDocPosts: any[] = [];
  public resposts: any[] = [];
  public pendPosts: any[] = [];
  public page: number = 1;
  public pendingPage: number = 1;
  public pageLibDoc: number = 1;


  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _libDocumentService: LibDocumentService,
    private _resPostService: RespostService,
    private router: Router,

  ) {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getPostsByUser();

  }

  getCompletePostsByUser() {
    this._postService.getCompletePostByUser(this.identity.sub, this.page).subscribe(
      response => {
        console.log(response);
        if (response.status == "success") {
          this.completePosts.push(...response.posts.data);
        }
      },
      error => {
        console.log(error);
      }

    );
  }

  getLibDocumentsByUser() {
    this._libDocumentService.getLibDocumentsByUser(this.identity.sub, this.pageLibDoc).subscribe(
      response => {
        console.log(response);
        if (response.status == "success") {
          this.libDocPosts.push(...response.libdocuments.data);
        }
      },
      error => {
        console.log(error);
      }
    );
  }



  getPostsByUser() {

    if (this.identity && this.identity.role == 3) {
      this._resPostService.getPostByAdminRespost(this.identity.sub, this.page).subscribe(
        response => {
          console.log(response);
          if (response.status == "success") {
            this.resposts.push(...response.respost.data);
          }

        },

        error => {
          console.log(error);
        }
      );


      this.getLibDocumentsByUser();


    } else if (this.identity && this.identity.role == 1 || this.identity.role == 4 || this.identity.role == 2) {


      this.getCompletePostsByUser();

      this.getPendingPostsByUser();


    } else {
      this.router.navigate(['']);

    }


  }


  getPendingPostsByUser() {
    this._postService.getPendingPostsByUser(this.identity.sub, this.pendingPage).subscribe(
      response => {
        console.log(response);
        if (response.status == "success") {
          this.pendPosts.push(...response.posts.data);
        }
      },
      error => {
        console.log(error);
      }

    );

  }

  onScrollDown() {
    this.page++;
    this.getCompletePostsByUser();
  }

  onScrollDownCompletePending() {
    this.pendingPage++;
    this.getPendingPostsByUser();
  }

  onScrollDownLibDoc() {
    this.pageLibDoc++;
    this.getLibDocumentsByUser();
  }

}
