import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers:[UserService]

})
export class EditUserComponent implements OnInit {

  public userUpdate: User;
  public identity: any;
  public token: string;

  constructor(private _userService: UserService) { 
    this.userUpdate = new User(1, '','','ROLE_USER','','','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.userUpdate = this.identity;

  }

  ngOnInit(): void {
    this.userUpdate = new User(1, '','','ROLE_USER','','','','');
  }

  onSubmitEdit(user: any){

  }

}
