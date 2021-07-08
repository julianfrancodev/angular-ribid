import { Component, OnInit } from '@angular/core';
declare var VANTA;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    VANTA.HALO({
      el: "#halo",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 300.00,
      minWidth: 300.00,
      backgroundColor: 0x292b2c,
      size: 1.70,
      xOffset: 0.17
    })
  }

}
