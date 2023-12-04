import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orario',
  standalone: true
})
export class FilterOrarioPipe implements PipeTransform{
  transform(listaSpettacolo: any[], orario: string) : any[] {
    if (!listaSpettacolo) return [];
    if (!orario) return listaSpettacolo;
    return listaSpettacolo.filter( it => {
      return (!orario || it.orario<=(orario) )
    })
  }
}