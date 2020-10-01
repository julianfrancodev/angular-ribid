import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public page_title = 'Inicio'

  constructor() {
    this.page_title = 'Inicio'
   }

  ngOnInit(): void {
  }

}
