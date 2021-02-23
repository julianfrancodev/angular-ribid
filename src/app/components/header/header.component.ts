import { Component, OnInit, DoCheck } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { global } from '../../services/global';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService, PostService]
})
export class HeaderComponent implements OnInit, DoCheck {

  public closeResult: string = '';
  public user: User;
  public status: string;
  public userSiginin: User;
  public token: string;
  public identity: any;
  public url: string;
  public searchControl = new FormControl();
  public filteredPosts: any[] = [];
  public isLoading = false;
  public errorMsg: string;


  constructor(
    private modalService: NgbModal,
    private _userService: UserService,
    private _postService: PostService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '');
    this.userSiginin = new User(1, '', '', 'ROLE_USER', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getSearchPosts();
  }


  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  showSuccess() {
    this.toastr.success('Ya puedes ingresar a tu cuenta', 'Correcto');
  }

  showError(message: string) {
    this.toastr.error(message, 'Lo sentimos');
  }

  showSuccessSignin() {
    this.toastr.success('Bienvenido');
  }

  showLogoutSuccess() {
    this.toastr.success('Hasta la proxima!');
  }

  showErrorSignin() {
    this.toastr.error('Email o contraseña incorrectos', "Vaya!");
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openSingup(singup: any) {
    this.modalService.open(singup, { centered: true });
  }

  onSubmitRegister(form: any) {

    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == "success") {
          this.status = response.status;
          this.showSuccess();
          this.modalService.dismissAll('Reason');
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.showError(error.error.errors.email[0]);
        this.status = 'error';

      }
    );
  }


  onSubmitSignin(form: any) {
    this._userService.signin(this.userSiginin).subscribe(

      response => {
        if (response.status != 404) {
          this.status = "success";
          this.token = response;
          this.showSuccessSignin();
          this.modalService.dismissAll('Reason');
          localStorage.setItem('token', this.token);

          // User identified

          this._userService.signin(this.userSiginin, true).subscribe(
            response => {
              this.identity = response;
              localStorage.setItem('indentity', JSON.stringify(this.identity));
              form.reset();

            },
            error => {
              console.log(error);
              this.status = 'error';
              this.showErrorSignin();
            }
          )

        } else {
          this.showErrorSignin();
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
        this.showErrorSignin();

      }
    )
  }

  getSearchPosts() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.filteredPosts = [];
        this.isLoading = true;
      }),
      switchMap(value => this._postService.getPostsBySearch(value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
      )
    ).subscribe(response => {
      console.log(response);
      if (response.posts.length < 1) {
        this.errorMsg = "not found";
        this.filteredPosts = [];
      } else {
        this.errorMsg = "";
        this.filteredPosts = response.posts;
      }

    });
  }

  logout() {

    localStorage.clear();
    this.token = null;
    this.identity = null;
    this.userSiginin = new User(1, '', '', 'ROLE_USER', '', '', '');
    this.router.navigate(['']);
    this.showLogoutSuccess();
  }



}
