import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      des: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      des: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero:  '',
    publisher:  Publisher.MarvelComics,
    alter_ego:  '',
    first_appearance:  '',
    characters:  '',
    alt_img:  ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
