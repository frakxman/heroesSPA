import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlBase: string = environment.urlBase;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.urlBase }/heroes`);
  }

  getHeroeById( id: string ): Observable<Heroe> {
    return this.http.get<Heroe>(`${ this.urlBase }/heroes/${ id }`);
  }

  getSuggestions( term: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.urlBase }/heroes?q=${ term }&_limit=5`);
  }
}
