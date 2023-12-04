import { Component, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/modules/app-layout/components/header/header.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf, NgFor} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { SpettacoloModelResponse } from 'src/app/models';
import { SpettacoloService } from 'src/app/services/spettacolo.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SearchPipeComponent, FilterTipologiaPipe, FilterCostoPipe, FilterOrarioPipe } from 'src/app/pipes';
import { ImageConvertComponent } from '../image-convert/image-convert.component';

@Component({
  standalone: true,
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
  imports: [
    RouterModule,
    HeaderComponent,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    FormsModule,
    MatSliderModule,
    MatDividerModule,
    MatCardModule,
    NgFor,
    SearchPipeComponent,
    FilterTipologiaPipe,
    FilterCostoPipe,
    FilterOrarioPipe,
    MatSidenavModule,
  ]
})
export default class HomeListComponent implements OnInit{
  tipologia : any;
  costo : any;
  orario :any;
  ricerca : any;
  listaSpettacolo: SpettacoloModelResponse[]=[];
  sceltaTipo: string[]=["", "COMMEDIA", "HORROR", "ROMANTICO"];
  sceltaCosto: string[]=["","5.00", "10.00","15.00","20.00","25.00","30.00","35.00", "40.00","45.00", "50.00"];
  sceltaOrario: string[]=["","00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
  listaFiltrata: SpettacoloModelResponse[]=[];
 

  constructor(
    private spettacoloService: SpettacoloService,
    private router: Router
    ){};

  ngOnInit(){
    this.spettacoloService.getSpettacoli().subscribe((data) => {
      this.listaSpettacolo=data;
    },
    (error) => {
      console.error('Errore nella richiesta', error);
    });
   
  }
  
  navigateTo(idSpettacolo: number){
    this.router.navigate(['/dettaglio-spettacolo', idSpettacolo]);
  }

  
  
  
}
