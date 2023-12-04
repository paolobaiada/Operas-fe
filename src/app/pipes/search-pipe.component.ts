import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipeComponent implements PipeTransform{
  transform(listaSpettacolo: any[], ricerca: string) : any[] {
    if (!listaSpettacolo) return [];
    if (!ricerca) return listaSpettacolo;
    ricerca = ricerca.toLocaleLowerCase();
    return listaSpettacolo.filter( it => {
      return (!ricerca || it.nomeProdotto.toLowerCase().includes(ricerca.toLowerCase()) )
    })
  }
}