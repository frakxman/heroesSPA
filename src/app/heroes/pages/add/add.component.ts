import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { DialogComponent } from '../../components/dialog/dialog.component';

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
      private router: Router,
      private snacKBar: MatSnackBar,
      public dialog: MatDialog
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
        .subscribe( heroe => this.showSnackBar('Heroe updated') );
    } else {
      // Add
      this.heroesService.addHeroe( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes/edit', heroe.id ]);
          this.showSnackBar('Heroe created');
        });
    }
  }

  delete(): void {
    const dialog = this.dialog.open( DialogComponent, {
      width: '300px',
      data: this.heroe
    } );

    dialog.afterClosed()
      .subscribe( ( result ) => {
        if ( result ) {
        this.heroesService.deleteHeroe( this.heroe.id! )
          .subscribe( resp => this.router.navigate(['/heroes']));
        }
      });
  }

  showSnackBar( message: string ): void {
    this.snacKBar.open( message, 'Ok!', {
      duration: 2500
    });
  }

}
