import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public page_title = 'Inicio'


  constructor(
    private _route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.page_title = 'Inicio'
  }

  ngOnInit(): void {
    this.showAlertEmailValidation();
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
}
