import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( heroe: Heroe ): string {

    if ( !heroe.id && !heroe.alt_img ) {
      return '../../../../assets/images/no-image.png';
    } else if ( heroe.alt_img ) {
      return heroe.alt_img;
    } else {
      return `../../../../assets/images/heroes/${ heroe.id }.jpg`;
    }
  }

}
