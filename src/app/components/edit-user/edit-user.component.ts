import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { global } from '../../services/global';
import { Router } from '@angular/router';
import { RespostService } from 'src/app/services/respost.service';
import { PostService } from 'src/app/services/post.service';
import { RoleService } from 'src/app/services/role.service';
import { LibDocumentService } from 'src/app/services/lib-document.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService, RespostService, PostService, RoleService, LibDocumentService]

})
export class EditUserComponent implements OnInit {

  public roles: any[] = [];
  public resposts: any[] = [];
  public completePosts: any[] = [];
  public pendPosts: any[] = [];
  public libDocPosts: any[] = [];
  public userUpdate: User;
  public identity: any;
  public token: string;
  public url: string;
  public throttle: number = 50;
  public scrollDistance: number = 1;
  public scrollUpDistance: number = 2;
  public direction: string = "";
  public page: number = 1;
  public pendingPage: number = 1;
  public lastPage: number;
  public completedPosts: number;
  public pendingPosts: number;
  public pageLibDoc: number = 1;


  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,jpeg",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'user/upload',
      method: "POST",
      headers: {
        'Authorization': this._userService.getToken()
      },
      responseType: 'json',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    replaceTexts: {
      attachPinBtn: 'Seleccionar Imagen',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Fallo al subir la imagen',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private _resPostService: RespostService,
    private _postService: PostService,
    private _roleService: RoleService,
    private _libDocumentService: LibDocumentService
  ) {
    if (this._userService.getIdentity() == null) {
      this.router.navigate(['']);
    }
    this.userUpdate = new User(1, '', '', '1', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.userUpdate = this.identity ?? this.userUpdate;
    this.url = global.url;
    this.userUpdate = new User(
      this.identity.id,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.image,
      this.identity.phone,
      this.identity.birth_date
    );
  }

  ngOnInit(): void {
    console.log(this.userUpdate);
    this.getPostsByUser();
    this.getRoles();
    this.getPostCountByUser();

  }

  showSuccessSignin() {
    this.toastr.success('Usuario actualizado');
  }

  onSubmitEdit(form: any) {
    this._userService.update(this.token, this.userUpdate).subscribe(
      (response: any) => {
        console.log(response);
        if (response.changes.name) {
          this.userUpdate.name = response.changes.name;
        }
        if (response.changes.surname) {
          this.userUpdate.surname = response.changes.surname;
        }
        if (response.changes.email) {
          this.userUpdate.email = response.changes.email;
        }

        if (response.changes.image) {
          this.userUpdate.image = response.changes.image;
        }

        this.identity = this.userUpdate;
        this.identity.sub = response.user.sub;

        localStorage.setItem('indentity', JSON.stringify(this.identity));
        this.showSuccessSignin();
      },
      error => {
        console.log(error);
      }
    );
  }

  avatarUpload(data: any) {
    this.userUpdate.image = data.body.image;
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

  getLibDocumentsByUser(){
    this._libDocumentService.getLibDocumentsByUser(this.identity.sub, this.pageLibDoc).subscribe(
      response =>{
        console.log(response);
        if(response.status == "success"){
          this.libDocPosts.push(...response.libdocuments.data);
        }
      },
      error =>{
        console.log(error);
      }
    );
  }


  getPostCountByUser() {

    if (this.identity && this.identity.role == 3) {
      this._resPostService.getCountCompletePostsByAdmin(this.identity.sub).subscribe(
        response => {
          if (response.status == "success") {
            this.completedPosts = response.respost;
          }
        },
        error => {
          console.log(error);
        }
      );

      this._resPostService.getCountIncompletePostsByAdmin().subscribe(
        response => {
          if (response.status == "success") {
            this.pendingPosts = response.posts;
          }
        },
        error => {
          console.log(error);
        }
      )



    } else if (this.identity && this.identity.role == 1 || this.identity.role == 4 || this.identity.role == 2) {

      this._postService.getCountCompletedPostByUser(this.identity.sub).subscribe(
        response => {
          console.log(response);
          if (response.status === 'success') {
            this.completedPosts = response.posts;
          }
        },
        error => {
          console.log(error);
        }

      );

      this._postService.getCountPendingPostFromUser(this.identity.sub).subscribe(
        response => {
          console.log(response);
          if (response.status === 'success') {
            this.pendingPosts = response.posts;
          }
        },
        error => {
          console.log(error);
        }
      )

    } else {
      this.router.navigate(['']);

    }
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

  getRoles() {
    this._roleService.getRoles().subscribe(
      response => {
        if (response.status == "success") {
          this.roles = response.roles;
        }
      },
      error => {
        console.log(error);
      }
    )
  }


  onScrollDown() {
    this.page++;
    this.getCompletePostsByUser();
  }

  onScrollDownCompletePending() {
    this.pendingPage++;
    this.getPendingPostsByUser();
  }

  onScrollDownLibDoc(){
    this.pageLibDoc++;
    this.getLibDocumentsByUser();
  }



}
