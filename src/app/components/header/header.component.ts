import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[UserService]
})
export class HeaderComponent implements OnInit {

  closeResult = '';
  public user: User;
  public status: string;



  constructor(private modalService: NgbModal, private _userService: UserService,private toastr: ToastrService) {
    this.user = new User(1, '','','ROLE_USER','','','','');
   }

  ngOnInit(): void {
    console.log(this._userService.test());
  }

  showSuccess() {
    this.toastr.success('Ya puedes ingresar a tu cuenta', 'Correcto');
  }

  showError(){
    this.toastr.error('No pudimos crear tu cuenta', 'Error');
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
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

  onSubmitRegister(form: any){
    
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == "success"){
          this.status = response.status;
          this.showSuccess();
          form.reset();
        }else{
          this.status = 'error';          
        }
      },
      error =>{
        console.log(<any>error);
        this.showError();
        this.status = 'error';
      }
    );
  }


}
