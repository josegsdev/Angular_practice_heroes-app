import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../../heroes/interfaces/heroe.interface';

@Pipe({
  name: 'imagenHeroe'
})
export class ImagenHeroePipe implements PipeTransform {

  transform(heroe:Heroe): string {
    return `./assets/heroes/${heroe.id}.jpg`;
  }
}
