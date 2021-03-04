import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
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
  };

  constructor( 
      private heroesService: HeroesService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe( switchMap( ({ id }) => this.heroesService.getHeroeById( id ) ) )
      .subscribe( heroe => this.heroe = heroe );
  }

  save(): void {
    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if ( this.heroe.id ) {
      // Update
      this.heroesService.updateHeroe( this.heroe )
        .subscribe( heroe => console.log( 'Update', heroe ) );
    } else {
      // Add
      this.heroesService.addHeroe( this.heroe )
        .subscribe( heroe => this.router.navigate(['/heroes/edit', heroe.id ]));
    }
  }

  delete() {
    this.heroesService.deleteHeroe( this.heroe.id! )
      .subscribe( resp => this.router.navigate(['/heroes']));
  }

}
