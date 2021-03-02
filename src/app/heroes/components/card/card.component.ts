import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [`
    mat-card {
      margin-top: 10px;
    }
  `]
})
export class CardComponent implements OnInit {

  @Input() heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
