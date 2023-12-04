import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipologia',
  standalone: true
})
export class FilterTipologiaPipe implements PipeTransform{
  transform(listaSpettacolo: any[], tipologia: string) : any[] {
    if (!listaSpettacolo) return [];
    if (!tipologia) return listaSpettacolo;
    return listaSpettacolo.filter( it => {
      return (!tipologia || it.tipologia.includes(tipologia) )
    })
  }
}