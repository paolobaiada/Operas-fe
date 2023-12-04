import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/modules/app-layout/components/header/header.component';
import { CardProfiloComponent } from 'src/app/modules/card-profilo/components/card-profilo.component';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { PrenotazioneService } from 'src/app/services/prenotazione.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    CardProfiloComponent,
    MatCardModule,
    CommonModule,
    MatSidenavModule
  ]
})
export default class DettaglioComponent implements OnInit{
  idPrenotazione!: any;
  prenotazione: any;

  constructor(
    private router: ActivatedRoute,
    private prenotazioneService: PrenotazioneService
  ){}

  ngOnInit(): void {
    this.idPrenotazione = this.router.snapshot.paramMap.get('idPrenotazione')
    this.prenotazioneService.getDettaglio(this.idPrenotazione).subscribe((data) => {
      this.prenotazione=data;
    })
  }
  
}
