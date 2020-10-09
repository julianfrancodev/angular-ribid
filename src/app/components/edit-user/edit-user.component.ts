import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {global} from '../../services/global';
import {Router} from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]

})
export class EditUserComponent implements OnInit {

  public userUpdate: User;
  public identity: any;
  public token: string;
  public url: string;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'user/upload',
      method:"POST",
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

  constructor(private _userService: UserService, private router: Router) {
    if(this._userService.getIdentity() == null){
      this.router.navigate(['']);
    }
    this.userUpdate = new User(1, '', '', 'ROLE_USER', '', '', '', '');
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
      this.identity.description,
      this.identity.image
    );
  }

  ngOnInit(): void {
    console.log(this.userUpdate);
  }

  onSubmitEdit(form: any) {
    this._userService.update(this.token, this.userUpdate).subscribe(
      (response: any) => {
        console.log(response);
        if(response.changes.name){
          this.userUpdate.name =response.changes.name;
        }
        if(response.changes.surname){
          this.userUpdate.surname =response.changes.surname;
        }
        if(response.changes.email){
          this.userUpdate.email =response.changes.email;
        }
        if(response.changes.description){
          this.userUpdate.description =response.changes.description;
        }

        if(response.changes.image){
          this.userUpdate.image =response.changes.image;
        }
        this.identity = this.userUpdate;

        localStorage.setItem('indentity', JSON.stringify(this.identity));
      },
      error => {
        console.log(error);
      }
    );
  }

  avatarUpload(data: any){
    this.userUpdate.image = data.body.image;
  }

}
