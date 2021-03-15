import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { PusherService } from '../../services/pusher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PusherService, UserService]
})
export class HomeComponent implements OnInit {

  public page_title = 'Inicio'
  public identity: any;

  constructor(
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _pusherService: PusherService,
    private _userService: UserService
  ) {
    this.page_title = 'Inicio'
    this.identity = this._userService.getIdentity();
  }


  ngOnInit(): void {
    this.showAlertEmailValidation();
    this.showDesktopNotification();
  }

  showErrorVerficationEmail() {
    this.toastr.warning("Error en el link de verificacion", "Vaya!", {
      timeOut: 6000
    });
  }

  showSuccessEmailVerfication() {
    this.toastr.success("Email verficado, ya puedes ingresar", "Bien", {
      timeOut: 4000
    })
  }

  showAlertEmailValidation() {
    if (this._route.snapshot.queryParams['verification']
      && this._route.snapshot.queryParams['verification']
      == '4cc4d88f6c66ab68e21fad5a70b75c69') {

      this.showErrorVerficationEmail();

    } else if (this._route.snapshot.queryParams['verification']
      && this._route.snapshot.queryParams['verification'] == 'c1ab208ad4e235e7fb4bd8f688f4feb9') {

      this.showSuccessEmailVerfication();

    }
  }

  showDesktopNotification() {

    if (this.identity && this.identity.role === 3) {
      this._pusherService.channel.bind('App\\Events\\PostPublished', data => {
        console.log(data);
        if (!('Notification' in window)) {
          alert('Web Notification is not supported');
          return;
        };

        Notification.requestPermission(permission => {
          let notification = new Notification("Tienes una nueva solicitud", {
            tag: data.id,
            body: data.title,
            renotify: true,
            icon: "https://res.cloudinary.com/dzm7agwqs/image/upload/v1614635309/icon_qdzrlt.png"
          });
          notification.onclick = () => {
            window.open(window.location.href);
          };
        });

      });
    }else if(this.identity && (this.identity.role == 1 || this.identity.role == 4 || this.identity.role == 2)){

      this._pusherService.usersChannel.bind('App\\Events\\RespostPublished', data =>{
        console.log(data);
        if (!('Notification' in window)) {
          alert('Web Notification is not supported');
          return;
        };

        Notification.requestPermission(permission => {
          let notification = new Notification("Han respondido a la solicitud ", {
            tag: data.id,
            renotify: true,
            body: data.title,
            icon: "https://res.cloudinary.com/dzm7agwqs/image/upload/v1614635309/icon_qdzrlt.png"
          });
          notification.onclick = () => {
            window.open(window.location.href);
          };
        });
      });
    }
  }



}
