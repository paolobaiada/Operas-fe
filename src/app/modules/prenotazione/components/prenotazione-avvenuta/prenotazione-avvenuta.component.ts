import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/modules/app-layout/components/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor } from '@angular/common';
import { PrenotaModelResponse } from 'src/app/models';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-prenotazione-avvenuta',
  templateUrl: './prenotazione-avvenuta.component.html',
  styleUrls: ['./prenotazione-avvenuta.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatDividerModule,
    NgFor,
    MatIconModule
  ]
})
export default class PrenotazioneAvvenutaComponent implements OnInit{
  prenotazioni : PrenotaModelResponse[]=[]
  subtotale!: number
  totale!: number
  carrello: any[]=[];

  ngOnInit(): void {
    let prenotazioniJSON=localStorage.getItem('carrello')
    let totaleJSON=localStorage.getItem('totale')
    if(prenotazioniJSON){
      this.prenotazioni=JSON.parse(prenotazioniJSON)
    }
    if(totaleJSON){
      this.subtotale=JSON.parse(totaleJSON)
      this.totale=this.subtotale+5;
    }
    localStorage.removeItem('carrello')
    localStorage.removeItem('totale')
    localStorage.setItem('carrello',JSON.stringify(this.carrello))
    
}

}
