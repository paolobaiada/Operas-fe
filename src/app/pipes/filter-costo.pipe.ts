import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'costo',
  standalone: true
})
export class FilterCostoPipe implements PipeTransform{
  transform(listaSpettacolo: any[], costo: string) : any[] {
    if (!listaSpettacolo) return [];
    if (!costo) return listaSpettacolo;
    return listaSpettacolo.filter( it => {
      return (!costo || it.costo<=(costo) )
    })
  }
}