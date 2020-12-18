import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {

  constructor(public dialogRefS: MatDialogRef<SignupDialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRefS.close();
  }

}
