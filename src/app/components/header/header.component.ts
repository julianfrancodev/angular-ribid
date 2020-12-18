import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { global } from '../../services/global';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { SigninDialogComponent } from '../signin-dialog/signin-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  public closeResult: string = '';
  public user: User;
  public status: string;
  public userSiginin: User;
  public token: string;
  public identity: any;
  public url: string;


  constructor(
    private dialog: MatDialog,
    private _userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.userSiginin = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit(): void {
  }

  /*
  * Alerts 
  */

  showSuccess() {
    this.toastr.success('Ya puedes ingresar a tu cuenta', 'Correcto');
  }

  showError() {
    this.toastr.error('No pudimos crear tu cuenta', 'Error');
  }

  showSuccessSignin() {
    this.toastr.success('Bienvenido');
  }

  showLogoutSuccess() {
    this.toastr.success('Hasta la proxima!');
  }

  showErrorSignin() {
    this.toastr.error('Credenciales Invalidas');
  }

  /*
  * End Alerts 
  */

  /*
  * Dialog 
  */


 openDialog(): void {
    const dialogRef = this.dialog.open(SigninDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  /*
  * End Dialog 
  */


  /*
    * Auth
  */

  onSubmitRegister(form: any) {

    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          this.showSuccess();

          //todo dismiss the modal

          // this.modalService.dismissAll('Reason');
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.showError();
        this.status = 'error';

      }
    );
  }

  onSubmitSignin(form: any) {
    this._userService.signin(this.userSiginin).subscribe(
      response => {
        console.log(response);
        if (response.status != 404) {
          this.status = 'success';
          this.token = response;
          this.showSuccessSignin();
          // this.modalService.dismissAll('Reason');


          //User identified

          this._userService.signin(this.userSiginin, true).subscribe(
            response => {

              this.identity = response;
              console.log(this.token);
              console.log(this.identity);
              localStorage.setItem('token', this.token);
              localStorage.setItem('indentity', JSON.stringify(this.identity));
              form.reset();

            },
            error => {
              this.status = 'error';
              console.log(error);
              this.showErrorSignin();
            }
          )

        } else {
          this.showErrorSignin();
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
        this.showErrorSignin();

      }
    )
  }

  logout() {
    localStorage.removeItem('indentity');
    localStorage.removeItem('token');
    this.identity = null;
    this.token = null;
    this.router.navigate(['']);
    this.showLogoutSuccess();
  }


  /*
   * End Auth
  */

}


