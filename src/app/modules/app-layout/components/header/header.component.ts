import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatSidenavModule} from '@angular/material/sidenav';

import { MatDialog } from '@angular/material/dialog';

import { LoginService } from 'src/app/services';
import {
  // GENERIC_CONFIRM,
  LABEL_CONSTANT } from 'src/app/constants';
  import { AngularMaterialModule } from 'src/app/utils';
import { SessioneUtenteModel } from 'src/app/models';

import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


import { PrenotaModelRequest } from 'src/app/models';
import { MatButtonModule } from '@angular/material/button';

import { PrenotazioneService } from 'src/app/services/prenotazione.service';



// import { GenericConfirmModalComponent } from 'src/app/shared/components/generic-confirm-modal/generic-confirm-modal.component';

/** Una classe per il componente dell'header */
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    // SetTextByUrlPipe,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    
  ],
})
export class HeaderComponent {
  /** Costante delle label generiche */
  labelConstant: any = LABEL_CONSTANT;
  /** Subscription all'observable degli eventi di aggiornamento nominativo utente */
  nominativoUtenteListener!: Subscription;
  /** Il nominativo dell'utente */
  sessioneUtente!: SessioneUtenteModel;
  /** Indica se l'utente è ADMIN */
  isAdmin!: boolean;
  isLoggedIn!: boolean;
  drawer: any;
  spettacoli: any[] = [];
  carrello: any[]=[];
  subTotale!: number;
  totale !:number;
  

  /**
   * Il costruttore della classe.
   * @param {LoginService} loginService L'injectable del service Login
   * @param {ActivatedRoute} activatedRoute Fornisce accesso alle informazioni sulla rotta associata a questa componente
   * @param {Router} router L'injectable del service router per la navigazione tra viste e url
   * @param {MatDialog} matDialog L'injectable del service per aprire la modale
   */
  constructor(
    public loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private  prenotazione: PrenotazioneService,
  ) {}

  /**
   * Lifecycle Hook dell'OnInit.
   * Si imposta il nominativo dell'utente prendendolo dal LocalStorage
   * Si effettua la sottoscrizione all'observable dell'evento di aggiornamento nominativo dell'utente
   */
  ngOnInit(): void {
    // this.isAdmin = this.loginService.isAdmin();
     this.sessioneUtente = this.loginService.getUtenteSessione();
     const savedSpettacoli = sessionStorage.getItem('spettacoli');
     const carrelloJson = localStorage.getItem('carrello');
     const totaleJson = localStorage.getItem('totale');
     if (totaleJson) {
      // Verifica se l'array carrello è presente e ha una lunghezza maggiore di 0
      if (carrelloJson && JSON.parse(carrelloJson).length > 0) {
        this.subTotale = JSON.parse(totaleJson);
        this.totale = this.subTotale + 5;
      } else {
        this.subTotale = JSON.parse(totaleJson);
        this.totale = 0;
      }
    }
     if(carrelloJson){
        this.carrello = JSON.parse(carrelloJson);
     }
      if (savedSpettacoli) {
        // Se ci sono dati salvati nel localStorage, assegna l'array a this.spettacoli
        this.spettacoli = JSON.parse(savedSpettacoli);
      }
    // this.nominativoUtenteListener = this.loginService
    //   .updateNominativoUtenteListener()
    //   .subscribe((res: SessioneUtenteModel) => {
    //     console.log("utente:" + res.username);
    //     this.sessioneUtente = res;});
  }
  

  /**
   * Lifecycle hook per l'onDestroy
   * Si annullano le iscrizione effettuate agli observable.
   */
  ngOnDestroy(): void {
    if (this.nominativoUtenteListener) {
      this.nominativoUtenteListener.unsubscribe();
    }
  }

  /**
   * Mostra la modale di conferma logout.
   * Alla chiusura della modale se si è confermato il logout, viene effettuato.
   */
  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/home']);
    setTimeout(() => {
       window.location.reload()
    }, 1);
   
  }

  navigateTo() {
    this.router.navigate(['/login']);
  }
  
  
 goToProfilo(){
  this.router.navigate(['gestionale/profilo/profilo'])
 }

  goToHome(){
    this.router.navigate(['/home']);
  }

  prenota(carrello: any){
    const numeroCasuale: number = Math.random();
    let numero = 'ORN' + numeroCasuale.toString();
    let totale=0;
    carrello.forEach((element: PrenotaModelRequest) => {
      element.numeroOrdine=numero;
      totale+=element.spettacolo.costo;
      this.prenotazione.prenota(element).subscribe()
     });
     localStorage.setItem('carrello', JSON.stringify(carrello))
     localStorage.setItem('totale', JSON.stringify(totale))
    
    this.router.navigate(['/prenotazione'])

  }
 
  rimuoviDalCarrello(index: number): void {
    this.carrello.splice(index, 1);
    // Aggiorna il totale o altre logiche se necessario
    this.aggiornaTotale();
    // Salva il carrello nell'localStorage
    localStorage.setItem('carrello', JSON.stringify(this.carrello));
  }

  private aggiornaTotale(): void {
    this.subTotale = this.carrello.reduce((acc, curr) => acc + curr.spettacolo.costo, 0);
    if(this.carrello.length > 0){
    this.totale = this.subTotale + 5;
    }else{
      this.totale=0;    }
    localStorage.setItem('totale', JSON.stringify(this.totale));
  }

  svuotaCarrello(): void {
    this.carrello = [];
    this.aggiornaTotale(); // Aggiorna il totale o altre logiche se necessario
    localStorage.setItem('carrello',JSON.stringify(this.carrello));
     // Rimuovi il carrello dall'localStorage
  }
}
