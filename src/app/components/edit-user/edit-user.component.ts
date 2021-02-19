import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { global } from '../../services/global';
import { Router } from '@angular/router';
import { RespostService } from 'src/app/services/respost.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService, RespostService, PostService]

})
export class EditUserComponent implements OnInit {

  public resposts: any;
  public posts: [Post]
  public userUpdate: User;
  public identity: any;
  public token: string;
  public url: string;

  public options: Object = {
    placeholderText: 'Tu descripción puede ir aqui.'
  }

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
    private _postService: PostService
  ) {
    if (this._userService.getIdentity() == null) {
      this.router.navigate(['']);
    }
    this.userUpdate = new User(1, '', '', 'ROLE_USER', '', '', '');
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
      this.identity.image
    );
  }

  ngOnInit(): void {
    console.log(this.userUpdate);
    this.getPostsByAdminRespost();

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

  getPostsByAdminRespost() {

    if (this.identity) {
      this._resPostService.getPostByAdminRespost(this.identity.sub).subscribe(
        response => {
          console.log(response);
          if(response.status == "success"){
            this.resposts = response.respost;
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


}
