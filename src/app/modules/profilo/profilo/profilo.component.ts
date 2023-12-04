import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, delay, of } from 'rxjs';
import { LoginService } from 'src/app/services';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { SocietaService } from 'src/app/services/societa.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export default class ProfiloComponent {
  user: any;
  anagrafica: any;
  societa: any;
  datoDaResolver : string | undefined;
  
  constructor(
    private loginService: LoginService,
    private anagraficaService: AnagraficaService,
    private societaService: SocietaService,
    private route: ActivatedRoute
  ){}
  resolve(): Observable<any> {
    return of(this.user=this.loginService.getUtenteSessione(),
    this.anagrafica=this.anagraficaService.getAnagraficaSessione(),
    this.societa=this.societaService.getSocietaSessione()).pipe(delay(1000));
  }
}
