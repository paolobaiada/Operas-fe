import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/modules/app-layout/components/header/header.component';
import {MatCardModule} from '@angular/material/card';
import { SpettacoloService } from 'src/app/services/spettacolo.service';
import { PrenotaModelRequest, SessioneUtenteModel, SpettacoloModelResponse } from 'src/app/models';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgFor } from '@angular/common';
import { PrenotazioneService } from 'src/app/services/prenotazione.service';
import { MatDialog } from '@angular/material/dialog';
import { CarrelloDialogComponent } from '../carrello-dialog/carrello-dialog.component';
import { NgIf } from '@angular/common';
import { LoginService } from 'src/app/services';
 
@Component({
  selector: 'app-dettaglio-spettacolo-view',
  templateUrl: './dettaglio-spettacolo-view.component.html',
  styleUrls: ['./dettaglio-spettacolo-view.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    NgFor,
    NgIf
  ]
})
export default class DettaglioSpettacoloViewComponent implements OnInit {
  idSpettacolo!: any;
  dettaglioSpettacolo?: SpettacoloModelResponse;
  prodottoCarrello?: any[];
  prenotazioni: PrenotaModelRequest[] = [];
  subTotaleOrdine: any;
  totaleOrdine: any;
  userSession!: SessioneUtenteModel
 
  constructor(
    private spettacoloService: SpettacoloService,
    private route: ActivatedRoute,
    private router: Router,
    private prenotazione: PrenotazioneService,
    private dialog: MatDialog,
    private userService: LoginService
  ){};
 
  ngOnInit() {
    this.userSession=this.userService.getUtenteSessione();
    this.idSpettacolo = this.route.snapshot.paramMap.get('idSpettacolo');
    this.spettacoloService.getDettaglio(this.idSpettacolo).subscribe((dettaglio) =>{
      this.dettaglioSpettacolo=dettaglio;
 
 
    });
    
  }
  

  addToCart(){
    let anagraficaCarrello;
    let carrello;
    const carrelloJSON=localStorage.getItem('carrello');    
    const anagraficaJSON=localStorage.getItem('anagrafica');
  
    if(anagraficaJSON){
      anagraficaCarrello=JSON.parse(anagraficaJSON)
    }
    if(carrelloJSON){
      carrello=JSON.parse(carrelloJSON)       
      
    }
    
    let temp: PrenotaModelRequest = {
      idPrenotazione: 0, anagrafica: anagraficaCarrello, spettacolo: this.dettaglioSpettacolo, data: null,
      numeroOrdine: '', costo: 0
    }
    this.prenotazioni?.push(temp)
    carrello?.push(temp)
    let totale=0;
    carrello?.forEach((element: PrenotaModelRequest) => {
     
      totale+=element.spettacolo.costo;
      element.costo=element.spettacolo.costo;
      
     });
    
     localStorage.setItem('totale', JSON.stringify(totale))
     let totaleJSON=localStorage.getItem('totale')
     if(totaleJSON){
       this.subTotaleOrdine=JSON.parse(totaleJSON)
       this.totaleOrdine=this.subTotaleOrdine+5;
     }
    localStorage.setItem('carrello', JSON.stringify(carrello))
    this.prodottoCarrello=carrello;
  }

  openDialog(){
    this.dialog.open(CarrelloDialogComponent)
  }
 
  navigateTo(){
    this.router.navigate(['/home'])
  }

  login(){
    this.router.navigate(['/login'])
  }
 
  prenota(carrello: any){
    const numeroCasuale: number = Math.random();
    let numero = 'ORN' + numeroCasuale.toString();
    let totale=0;
    carrello.forEach((element: PrenotaModelRequest) => {
      element.numeroOrdine=numero;
      totale+=element.spettacolo.costo;
      element.costo=element.spettacolo.costo;
      this.prenotazione.prenota(element).subscribe()
     });
     localStorage.setItem('carrello', JSON.stringify(carrello))
     localStorage.setItem('totale', JSON.stringify(totale))
    
    this.router.navigate(['/prenotazione'])

  }
 
}