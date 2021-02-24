import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( heroe: Heroe ): string {
    return `../../../../assets/images/heroes/${ heroe.id }.jpg`;
  }

}
