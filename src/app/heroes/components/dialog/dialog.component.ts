import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
  ]
})
export class DialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Heroe
    ) { }

  ngOnInit(): void {
    console.log( this.data );
  }

  delete(): void {
    this.dialogRef.close( true );
  }

  close(): void {
    this.dialogRef.close();
  }

}
