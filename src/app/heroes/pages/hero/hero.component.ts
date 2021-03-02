import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [`
    img {
      border-radius: 5px;
      width: 100%;
    }
  `]
})
export class HeroComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute, private heroesService: HeroesService ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroesService.getHeroeById( id ) )
    )
      .subscribe( heroe => this.heroe = heroe );
  }

}
