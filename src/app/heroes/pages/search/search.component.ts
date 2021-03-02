import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  term = '';
  heroes: Heroe[] = [];
  heroeSelected: Heroe | undefined;

  constructor( private heroesServices: HeroesService ) { }

  ngOnInit(): void {
  }

  seeking(): void {
    this.heroesServices.getSuggestions( this.term.trim() )
      .subscribe( heroes => this.heroes = heroes );
  }

  optionSelected( event: MatAutocompleteSelectedEvent ): void {

    if ( !event.option.value ) {
      this.heroeSelected = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;
    this.term = heroe.superhero;
    this.heroesServices.getHeroeById( heroe.id! )
      .subscribe( heroe => this.heroeSelected = heroe );
  }
}
