import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.css']
})
export class SigninDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SigninDialogComponent>, public dialogS: MatDialog,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  openDialogSingUp(): void {

    setTimeout(() => {
      const dialogRefS = this.dialogS.open(SignupDialogComponent, {
        width: '500px',
      });

      dialogRefS.afterClosed().subscribe(result => {
        console.log(result);
        console.log('The dialog was closed');
      });

    }, 100);



  }






}
